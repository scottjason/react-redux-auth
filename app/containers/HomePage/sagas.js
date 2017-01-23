import request from 'utils/request';
import * as actions from './actions';
import { CHECK_AUTH, LOGIN, REGISTER } from './constants';
import * as selectors from 'containers/HomePage/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* authReq() {

  const u = yield select(selectors.user());
  if (!u || !u.token) return;
  
  const requestURL = '/isAuthenticated';
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: u.token
    })
  }

  try {
    const res = yield call(request, requestURL, requestOpts);
    yield put(actions.authLoaded(res.isAuthenticated));
  } catch (err) {
    console.log('err', err)
    yield put(actions.authErr(err));
  }
}

function* registerReq() {
  
  const isValidEmail = yield select(selectors.isValidEmail());
  const isValidPassword = yield select(selectors.isValidPassword());
  
  if (!isValidEmail || !isValidPassword) {
    yield put(actions.authErr({ message: 'Invalid Credentials' }));
  } else {
    
    const e = yield select(selectors.email());
    const p = yield select(selectors.password());
    const requestURL = `/register?email=${e}&password=${p}`;

    try {
      const res = yield call(request, requestURL);
      yield put(actions.registerLoaded(res.user));  
    } catch (err) {
      yield put(actions.authErr(err));
    }  
  }  
}

function* loginReq() {

  const e = yield select(selectors.email());
  const p = yield select(selectors.password());
  const requestURL = `/login?email=${e}&password=${p}`;

  try {
    const res = yield call(request, requestURL);
    yield put(actions.loginLoaded(res.user));  
  } catch (err) {
    yield put(actions.authErr(err));
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