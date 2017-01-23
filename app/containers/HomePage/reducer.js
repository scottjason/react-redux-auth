/*
 * HomeReducer
*/

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  email: '',
  password: '',
  authErr: null,
  isLogin: true,
  isValidEmail: false,
  isValidPassword: false,
  isAuthenticated: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.CHANGE_EMAIL:
      return state
        .set('email', action.email)
        .set('isValidEmail', isValidEmail(action.email));
    case constants.CHANGE_PASSWORD:
      return state
        .set('password', action.password)
        .set('isValidPassword', isValidPassword(action.password));
    case constants.TOGGLE_LOADER:
      return state
        .set('isLoading', !state.get('isLoading'));
    case constants.AUTH_LOADED:
      return state
        .set('isAuthenticated', action.isAuthenticated);    
    case constants.TOGGLE_AUTH:
      return state
        .set('isLogin', !state.get('isLogin'));
    case constants.REGISTER_LOADED:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', true)
        .set('user', action.user);    
    case constants.LOGIN_LOADED:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', true)
        .set('user', action.user);    
    case constants.AUTH_ERR:
      console.log("authErr hit", action)
      return state
        .set('isLoading', false)
        .set('authErr', action.message);
    default:
      return state;
  }
}

function isValidEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

export default homeReducer;