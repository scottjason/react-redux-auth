/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const isAuthenticated = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isAuthenticated')
);

const isLogin = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isLogin')
);

const isLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isLoading')
);

const email = () => createSelector(
  selectHome,
  (homeState) => homeState.get('email')
);

const password = () => createSelector(
  selectHome,
  (homeState) => homeState.get('password')
);

const isValidEmail = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isValidEmail')
);

const isValidPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isValidPassword')
);

const user = () => createSelector(
  selectHome,
  (homeState) => homeState.get('user')
)

export {
  user,
  isLogin,
  isAuthenticated,
  isLoading,  
  email,
  password,
  isValidEmail,
  isValidPassword,
};