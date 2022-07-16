// @ts-nocheck
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { saveQuestionToUser, saveAnswerToUser } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

/**
 * Action Creator - Receive Questions
 * @param questions The questions
 */
export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

/**
 * Action Creator - Answer a Question
 * @param id The question ID
 * @param answer The answer
 * @param authedUser The user who is answering
 */
export const answerQuestion = ({ id, answer, authedUser }) => {
  return {
    type: ANSWER_QUESTION,
    id,
    answer,
    authedUser,
  };
};

/**
 * Action Creator - Add a Question
 * @param question The question
 */
export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

/**
 * Action Event Handler - Add a Question
 * @param selectionOne The first selection
 * @param selectionTwo The second selection
 */
export const handleAddQuestion = ({ optionOneText, optionTwoText }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(saveQuestionToUser(question));
        dispatch(hideLoading());
      })
      .catch((error) => {
        console.log('Error adding question: ' + error);
      });
  };
};

/**
 * Action Event Handler - Answer
 * @param id The question ID
 * @param answer The answer
 */
export const handleAnswer = (id, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      id,
      answer,
      authedUser,
    }).then(() => {
      dispatch(answerQuestion({ id, answer, authedUser }));
      dispatch(saveAnswerToUser({ id, answer, authedUser }));
    });
  };
};
