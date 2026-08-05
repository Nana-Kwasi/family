export interface FaqEntry {
  question: string;
  answer: string;
}

/** Shared so the login page and any in-app help render exactly the same answers. */
export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: 'How does the assistant decide what to say?',
    answer:
      'Every question is embedded and matched against your uploaded documents. The best-matching passages are handed to the language model, which phrases the answer. If nothing relevant is found, it answers from its own general knowledge instead of going silent.',
  },
  {
    question: 'I uploaded a document — why is it not being used yet?',
    answer:
      'Text is extracted immediately, then chunking and embedding run in the background. Watch the Status column on the Knowledge Base page: PENDING, then INDEXING, then INDEXED. Only INDEXED documents are searchable.',
  },
  {
    question: 'The AI gave a wrong answer. What should I do?',
    answer:
      'First use the search box on the Knowledge Base page with the same question. If the right passage does not come back, your documents do not cover it — upload better material. If the right passage does come back but the answer was still wrong, the model is the weak point; a larger model will do better.',
  },
  {
    question: 'What do the retrieval settings actually change?',
    answer:
      'Max results is how many passages get sent to the model. Minimum score is how similar a passage must be to count — raise it for stricter answers, lower it if good material is being ignored. Chunk size and overlap change how documents are cut up, and require a re-index to take effect.',
  },
  {
    question: 'Which languages are supported?',
    answer:
      'English, French, Spanish and Twi. The language is detected from the question and the answer comes back in the same language, even when your source documents are written in English.',
  },
  {
    question: 'Do I need to restart anything after changing AI Settings?',
    answer:
      'No. Settings are stored in the database and take effect on the very next request, including a change of model or provider. Only chunk size and overlap need the extra step of re-indexing.',
  },
];
