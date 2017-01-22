/*
 * HomeReducer
*/

import { fromJS } from 'immutable';

import {
  AUTH_LOADED,
  TOGGLE_LOADER,
  TOGGLE_AUTH,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  REGISTER_LOADED,
  LOGIN_LOADED,
  REGISTER_ERROR,
  LOGIN_ERROR
} from './constants';

const initialState = fromJS({
  email: '',
  password: '',
  isLogin: true,
  isValidEmail: false,
  isValidPassword: false,
  isAuthenticated: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADED:
      return state
        .set('user', action.user)
        .set('isAuthenticated', action.isAuthenticated);
    case CHANGE_EMAIL:
      return state
        .set('email', action.email)
        .set('isValidEmail', isValidEmail(action.email));
    case CHANGE_PASSWORD:
      return state
        .set('password', action.password)
        .set('isValidPassword', isValidPassword(action.password));
    case TOGGLE_LOADER:
      var val = !state.get('isLoading');
      return state
        .set('isLoading', val);    
    case TOGGLE_AUTH:
      var val = !state.get('isLogin');
      return state
        .set('isLogin', val);
    case REGISTER_LOADED:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', true)
        .set('user', action.user);    
    case LOGIN_LOADED:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', true)
        .set('user', action.user);
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