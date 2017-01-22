/*
 * Home Actions
*/

import {
  AUTH_LOADED,
  AUTH_ERR,
  CHECK_AUTH,
  TOGGLE_LOADER,
  TOGGLE_AUTH,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN,
  REGISTER,
  REGISTER_LOADED,
  LOGIN_LOADED,
  REGISTER_ERROR,
  LOGIN_ERROR,
} from './constants';

export function checkAuth() {
  return {
    type: CHECK_AUTH,
  };
}

export function authLoaded(isAuthenticated) {
  return {
    type: AUTH_LOADED,
    isAuthenticated: isAuthenticated,
  };
}

export function authErr(err) {
  return {
    type: AUTH_ERR,
    err: err
  };
}

export function toggleLoader() {
  return {
    type: TOGGLE_LOADER,
  };
}

export function toggleAuth() {
  return {
    type: TOGGLE_AUTH,
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function register() {
  return {
    type: REGISTER
  };
}

export function registerLoaded(user) {
  return {
    type: REGISTER_LOADED,
    user: user
  };
}

export function registerErr(err) {
  return {
    type: REGISTER_ERROR,
    err: err
  };
}

export function login() {
  return {
    type: LOGIN
  };
}

export function loginLoaded(user) {
  return {
    type: LOGIN_LOADED,
    user: user
  };
}

export function loginErr(err) {
  return {
    type: LOGIN_ERROR,
    err: err
  };
}

