import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { USER_REQUESTING } from './constants';

import {
    userRequestSuccess,
    userRequestError,
} from './actions';

// const userUrl = 'http://widgetizer.jcolemorrison.com/api/Clients';
const userUrl = 'http://localhost:9500/user';

function handleRequest(request) {
    return request
        .then(handleApiErrors)
        .then(response => response.json())
        .then(json => json)
        .catch(error => {
            throw error;
        });
}

function userRequestApi(client) {
    // const url = `${userUrl}/${client.id}/widgets`;
    const url = `${userUrl}`;
    const request = fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // passe our token as an "Authorization" header
            // Authorization: client.token.id || undefined,
            ...client.token,
        },
    });

    return handleRequest(request);
}

function* userRequestFlow(action) {
    try {
        // grab the client from our action
        const { client } = action;
        // call to our widgetRequestApi function with the client
        const user = yield call(userRequestApi, client);
        // dispatch the action with our widgets!
        yield put(userRequestSuccess(user));
    } catch (error) {
        yield put(userRequestError(error));
    }
}
function* usersWatcher() {
    // each of the below RECEIVES the action from the .. action
    yield [takeLatest(USER_REQUESTING, userRequestFlow)];
}

export default usersWatcher;
