/*
 * Home Actions
*/

import * as constants from './constants';

export function changeEmail(email) {
  return {
    type: constants.CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: constants.CHANGE_PASSWORD,
    password,
  };
}

export function checkAuth() {
  return {
    type: constants.CHECK_AUTH,
  };
}

export function authLoaded(isAuthenticated) {
  return {
    type: constants.AUTH_LOADED,
    isAuthenticated: isAuthenticated,
  };
}

export function authErr(err) {
  return {
    type: constants.AUTH_ERR,
    message: err.message
  };
}

export function toggleLoader() {
  return {
    type: constants.TOGGLE_LOADER,
  };
}

export function toggleAuth() {
  return {
    type: constants.TOGGLE_AUTH,
  };
}

export function register() {
  return {
    type: constants.REGISTER
  };
}

export function registerLoaded(user) {
  return {
    type: constants.REGISTER_LOADED,
    user: user
  };
}

export function login() {
  return {
    type: constants.LOGIN
  };
}

export function loginLoaded(user) {
  return {
    type: constants.LOGIN_LOADED,
    user: user
  };
}
