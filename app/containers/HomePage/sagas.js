import { take, fork, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { authLoaded, authErr, registerLoaded, registerErr, loginLoaded, loginErr } from './actions';
import { email, password } from 'containers/HomePage/selectors';
import { CHECK_AUTH, LOGIN, REGISTER } from './constants';
import request from 'utils/request';

function* authReq() {
  
  const requestURL = '/isAuthenticated';
  
  try {
    const res = yield call(request, requestURL);
    const user = res.user;
    const isAuthenticated = res.isAuthenticated;
    yield put(authLoaded(user, isAuthenticated));  
  } catch (err) {
    yield put(authErr(err));
  }
}

function* registerReq() {

  const e = yield select(email());
  const p = yield select(password());
  const requestURL = `/register?email=${e}&password=${p}`;

  try {
    const res = yield call(request, requestURL);
    yield put(registerLoaded(res.user));  
  } catch (err) {
    yield put(registerErr(err));
  }  
}

function* loginReq() {

  const e = yield select(email());
  const p = yield select(password());
  const requestURL = `/login?email=${e}&password=${p}`;

  try {
    const res = yield call(request, requestURL);
    yield put(loginLoaded(res.user));  
  } catch (err) {
    yield put(loginErr(err));
  }  
}

function* loginWatch() {
  const watcher = yield takeLatest(LOGIN, loginReq);
}

function* registerWatch() {
  const watcher = yield takeLatest(REGISTER, registerReq);
}

function* authWatch() {
  const watcher = yield takeLatest(CHECK_AUTH, authReq);
}

export default [
  authWatch,
  loginWatch,
  registerWatch,
];