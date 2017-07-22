import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { handleApiErrors } from '../lib/api-errors';
import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './constants';
import {
    setClient,
    unsetClient,
} from '../client/actions';
import {
  CLIENT_UNSET,
} from '../client/constants';

// const loginUrl = 'http://widgetizer.jcolemorrison.com/api/Clients/login';
const loginUrl = 'http://localhost:9500/login';

function loginApi(email, password) {
    return fetch(loginUrl, {
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

function* logout() {
    yield put(unsetClient());
    if (IS_CLIENT) {
        // localStorage.removeItem('token');
        document.cookie = 'jwt=';
    }
    browserHistory.push('/home');
}

function* loginFlow(email, password) {
    console.log('login');
    let token;
    try {
        token = yield call(loginApi, email, password);
        yield put(setClient(token));
        yield put({ type: LOGIN_SUCCESS });
        // if (IS_CLIENT) {
            // localStorage.setItem('token', JSON.stringify(token));
        document.cookie = `jwt=${encodeURIComponent(JSON.stringify(token))}`;
            // document.cookie = `jwt=${JSON.stringify(token)}`;
        // }
        browserHistory.push('/dashboard');
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
    } finally {
        if (yield cancelled()) {
            browserHistory.push('/home');
        }
    }
    return token;
}

function* loginWatcher() {
    while (true) {
        const { email, password } = yield take(LOGIN_REQUESTING);
        const task = yield fork(loginFlow, email, password);
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
        if (action.type === CLIENT_UNSET) yield cancel(task);
        yield call(logout);
    }
}

export default loginWatcher;
