import { getAfiaReply } from './afiaChat';

describe('Afia story follow-up flow', () => {
  it('continues the story when the user says continue', () => {
    const initialReply = getAfiaReply('tell me an anansi story', { userName: 'Nana' });
    expect(initialReply.action).toEqual(expect.objectContaining({ type: 'story' }));

    const followUp = initialReply.action;
    const continueReply = getAfiaReply('continue', { userName: 'Nana', followUp });

    const text = continueReply.segments.map((segment) => segment.text).join('');
    expect(text).toContain('Would you like me to continue further');
    expect(continueReply.action).toEqual(expect.objectContaining({ type: 'story' }));
  });
});
