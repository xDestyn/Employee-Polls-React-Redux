// @ts-nocheck
import { _saveQuestionAnswer } from '../utils/_DATA';

describe('_saveQuestionAnswer', () => {
  it('should return true when correct arguments are received', async () => {
    const authedUser = 'sarahedo';
    const id = '6ni6ok3ym7mf1p33lnez';
    const answer = 'optionOne';

    const response = await _saveQuestionAnswer({ authedUser, id, answer });

    expect(response).toBeTruthy();
  });

  it('should return an error if incorrect arguments are received', async () => {
    const authedUser = 'jsmith';
    const id = undefined;
    const answer = undefined;

    await expect(_saveQuestionAnswer({ authedUser, id, answer })).rejects.toMatchSnapshot();
  });
});
