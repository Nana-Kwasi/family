import { getAfiaReply } from './afiaChat';

describe('getAfiaReply follow-up flow', () => {
  it('returns a follow-up reply when the user confirms a navigation prompt', () => {
    const reply = getAfiaReply('yes', {
      userName: 'Nana',
      followUp: {
        type: 'navigate',
        path: '/store',
        label: 'Store',
        prompt: 'Would you like to visit the Store screen?',
      },
    });

    const text = reply.segments.map((segment) => segment.text).join('');
    expect(text).toContain('Store');
    expect(reply.action).toEqual({ type: 'navigate', path: '/store', label: 'Store' });
  });

  it('answers via the general Q&A dataset for keyword-based queries', () => {
    const reply = getAfiaReply('Explain a Ghanaian proverb about wisdom', { userName: 'Nana' });
    const text = reply.segments.map((segment) => segment.text).join('');

    expect(text.toLowerCase()).toContain('proverb');
    expect(text.toLowerCase()).toContain('patience');
    expect(reply.suggestions).toBeDefined();
  });
});
