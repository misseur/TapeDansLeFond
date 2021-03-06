import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';
import { handleApiErrors } from '../lib/api-errors';

const signupUrl = 'http://widgetizer.jcolemorrison.com/api/Clients';

function signupApi(email, password) {
    return fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function* signupFlow(action) {
    try {
        const { email, password } = action;
        const response = yield call(signupApi, email, password);
        yield put({ type: SIGNUP_SUCCESS, response });
    } catch (error) {
        yield put({ type: SIGNUP_ERROR, error });
    }
}

function* signupWatcher() {
    yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;
