// @ts-nocheck
import { _saveQuestion } from '../utils/_DATA';

describe('_saveQuestion', () => {
  it('should return formatted object when correct arguments are received', async () => {
    const question = {
      optionOneText: 'A',
      optionTwoText: 'B',
      author: 'jsmith',
    };

    const response = await _saveQuestion(question);
    expect(response).toMatchSnapshot({
      author: 'jsmith',
      id: expect.any(String),
      optionOne: { text: 'A' },
      optionTwo: { text: 'B' },
      timestamp: expect.any(Number),
    });
  });

  it('should return error when incorrect arguments are received', async () => {
    const question = {
      optionOneText: undefined,
      optionTwoText: undefined,
      author: 'jsmith',
    };

    await expect(_saveQuestion(question)).rejects.toMatchSnapshot();
  });
});
