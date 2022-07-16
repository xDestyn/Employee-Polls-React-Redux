import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

/**
 * Action Creator - Initial Data
 */
export const handleInitialData = () => {
  console.log('Getting initial data:');
  return (dispatch) => {
    dispatch(showLoading());
    console.log('Show Loading');
    return getInitialData().then(({ users, questions }) => {
      console.log('Before dispatch(receiveUsers)', users);
      dispatch(receiveUsers(users));
      console.log('After dispatch(receiveUsers)', users);
      console.log('Before dispatch(receiveQuestions)', questions);
      dispatch(receiveQuestions(questions));
      console.log('After dispatch(receiveQuestions)', questions);
      console.log('Hide Loading');
      dispatch(hideLoading());
    });
  };
};
