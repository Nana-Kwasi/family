/**
 * Client for the Mama Africa AI backend.
 *
 * The website never talks to Ollama or RunPod — it calls this one endpoint and the backend
 * handles language detection, knowledge retrieval, prompt building and conversation storage.
 */

import { authHeader } from './authToken';

const API_BASE_URL = (process.env.REACT_APP_AI_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const API_KEY = process.env.REACT_APP_AI_API_KEY || '';

/** Conversation ids live for the browser session, so a reload starts a fresh thread. */
const CONVERSATION_KEY = 'mama-africa-conversation-id';

export function getConversationId() {
  try {
    return sessionStorage.getItem(CONVERSATION_KEY) || null;
  } catch {
    return null;
  }
}

function rememberConversationId(id) {
  try {
    if (id) sessionStorage.setItem(CONVERSATION_KEY, id);
  } catch {
    /* private browsing — threading is a nicety, not a requirement */
  }
}

export function resetConversation() {
  try {
    sessionStorage.removeItem(CONVERSATION_KEY);
  } catch {
    /* ignore */
  }
}

export class AiUnavailableError extends Error {}

/** Afia now requires an account — the UI should offer sign-in, not a retry. */
export class SignInRequiredError extends Error {}

/**
 * A 401 has two very different causes, and telling them apart matters.
 *
 * <p>The visitor is signed out — offer sign-in. Or the site's API key is missing or wrong,
 * which is a deployment fault: telling a signed-in visitor to sign in then sends them round a
 * loop they cannot escape. That happened, because a stray .env.local shadowed the real key.
 */
async function signInOrConfigError(response) {
  let message = '';
  try {
    message = (await response.clone().json())?.message || '';
  } catch {
    /* body was not JSON — fall through to the sign-in case */
  }
  if (/api key/i.test(message)) {
    // eslint-disable-next-line no-console
    console.error('Afia is misconfigured: the backend rejected the site API key. Check REACT_APP_AI_API_KEY.');
    return new AiUnavailableError('Afia is not configured correctly on this site.');
  }
  return new SignInRequiredError('Sign in to talk with Afia.');
}

/**
 * Sends a message and returns { text, conversationId, language, model, latencyMs }.
 *
 * @param {string} message   what the visitor typed
 * @param {object} [options]
 * @param {AbortSignal} [options.signal]  lets the caller cancel when the chat is closed
 */
export async function askMamaAfrica(message, { signal } = {}) {
  // Signed in? Send the token: the backend takes the name from it rather than trusting
  // anything the page claims, and Afia greets the visitor properly.
  const headers = { 'Content-Type': 'application/json', ...authHeader() };
  if (API_KEY) headers['X-Api-Key'] = API_KEY;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers,
      signal,
      body: JSON.stringify({
        message,
        conversationId: getConversationId(),
      }),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new AiUnavailableError('Could not reach the AI service');
  }

  if (response.status === 401 || response.status === 403) {
    throw await signInOrConfigError(response);
  }

  if (!response.ok) {
    // The backend returns 503 when the model provider itself is down.
    throw new AiUnavailableError(
      response.status === 503
        ? 'The AI is warming up'
        : `AI service returned ${response.status}`,
    );
  }

  const data = await response.json();
  rememberConversationId(data.conversationId);

  return {
    text: data.response,
    conversationId: data.conversationId,
    language: data.language,
    model: data.model,
    latencyMs: data.latencyMs,
  };
}

/**
 * Streams the answer token by token over server-sent events.
 *
 * EventSource only speaks GET, so the SSE frames are read off the fetch body and parsed here.
 *
 * @param {string} message
 * @param {object} handlers
 * @param {(chunk: string) => void} handlers.onToken  called for each chunk as it arrives
 * @param {(summary: object) => void} [handlers.onDone] called once with the final response
 * @param {AbortSignal} [handlers.signal]
 */
export async function streamMamaAfrica(message, { onToken, onDone, signal } = {}) {
  const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream', ...authHeader() };
  if (API_KEY) headers['X-Api-Key'] = API_KEY;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
      method: 'POST',
      headers,
      signal,
      body: JSON.stringify({ message, conversationId: getConversationId() }),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new AiUnavailableError('Could not reach the AI service');
  }

  // Checked before the generic branch: needing an account is not the AI being unavailable,
  // and the culture page uses this streaming path — so missing it here is what made Afia say
  // "I cannot reach my thoughts" to every signed-out visitor.
  if (response.status === 401 || response.status === 403) {
    throw await signInOrConfigError(response);
  }

  if (!response.ok || !response.body) {
    throw new AiUnavailableError(
      response.status === 503 ? 'The AI is warming up' : `AI service returned ${response.status}`,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let summary = null;

  const handleFrame = (frame) => {
    let event = 'message';
    const dataLines = [];
    for (const line of frame.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      // Multi-line payloads arrive as consecutive data: lines and are rejoined with newlines.
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).replace(/^ /, ''));
    }
    if (dataLines.length === 0) return;

    const raw = dataLines.join('\n');
    if (event === 'token') {
      try {
        onToken?.(JSON.parse(raw).t ?? '');
      } catch {
        onToken?.(raw);
      }
    } else if (event === 'done') {
      try {
        const payload = JSON.parse(raw);
        rememberConversationId(payload.conversationId);
        summary = {
          text: payload.response,
          conversationId: payload.conversationId,
          language: payload.language,
          model: payload.model,
          latencyMs: payload.latencyMs,
        };
      } catch {
        /* the tokens already rendered — a malformed summary is not worth failing over */
      }
    }
  };

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line.
    let split = buffer.indexOf('\n\n');
    while (split !== -1) {
      handleFrame(buffer.slice(0, split));
      buffer = buffer.slice(split + 2);
      split = buffer.indexOf('\n\n');
    }
  }
  if (buffer.trim()) handleFrame(buffer);

  onDone?.(summary);
  return summary;
}
