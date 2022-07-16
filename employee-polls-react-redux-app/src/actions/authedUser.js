export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

/**
 * Action Creator - Set current logged in user
 * @param id The id of the Authed User
 */
export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

/**
 * Action Creator - Logout current logged in user
 */
export const logoutAuthedUser = () => {
  return {
    type: LOGOUT_AUTHED_USER,
  };
};
