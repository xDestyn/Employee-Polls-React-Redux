import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  formatQuestion,
} from './_DATA.js';

export const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions,
  }));
};

export const saveQuestion = (question) => {
  return _saveQuestion(question);
};

export const saveQuestionAnswer = (answer) => {
  return _saveQuestionAnswer(answer);
};

export const formatNewQuestion = (question) => {
  return formatQuestion(question);
};
