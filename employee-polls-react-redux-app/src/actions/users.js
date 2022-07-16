// @ts-nocheck
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';

/**
 * Action Creator - Receive Users
 * @param users The users
 */
export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

/**
 * Action Creator - Save Question to User
 * @param question The question
 */
export const saveQuestionToUser = (question) => {
  return {
    type: SAVE_QUESTION_TO_USER,
    question,
  };
};

/**
 * Action Creator - Save Answer to User
 * @param id The question id
 * @param answer The answer
 * @param authedUser The user we are saving the answer to
 */
export const saveAnswerToUser = ({ id, answer, authedUser }) => {
  return {
    type: SAVE_ANSWER_TO_USER,
    id,
    answer,
    authedUser,
  };
};
