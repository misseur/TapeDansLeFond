import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import {
    COMPANY_CREATING,
    COMPANY_REQUESTING_ONE,
    COMPANY_REQUESTING_ALL,
    COMPANY_INVITATION_EMAIL,
} from './constants';

import {
    companyCreateSuccess,
    companyCreateError,
    companyRequestOneSuccess,
    companyRequestOneError,
    companyRequestAllSuccess,
    companyRequestAllError,
    companyEmailSuccess,
    companyEmailError,
} from './actions';

// const companyUrl = 'http://widgetizer.jcolemorrison.com/api/Clients';
// LOL
const baseUrl = 'http://localhost:9500';
const companyUrl = 'http://localhost:9500/company';
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

function companyCreateApi(client, company) {
    const url = `${companyUrl}/create`;
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...client.token,
        },
        body: JSON.stringify(company),
    });
    return handleRequest(request);
}

function* companyCreateFlow(action) {
    try {
        const { client, company, user } = action;
        const createdCompany = yield call(companyCreateApi, client, company);
        yield put(companyCreateSuccess(createdCompany, user));
    } catch (error) {
        // same with error
        yield put(companyCreateError(error));
    }
}

function companyRequestOneApi(client) {
    const url = `${userUrl}/company`;
    const request = fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...client.token,
        },
    });

    return handleRequest(request);
}

function* companyRequestOneFlow(action) {
    try {
        // grab the client from our action
        const { client } = action;
        // call to our widgetRequestApi function with the client
        const companies = yield call(companyRequestOneApi, client);
        // dispatch the action with our widgets!
        yield put(companyRequestOneSuccess(companies));
    } catch (error) {
        yield put(companyRequestOneError(error));
    }
}

function companyRequestAllApi(client) {
    // const url = `${companyUrl}/${client.id}/widgets`;
    const url = `${companyUrl}/all`;
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

function* companyRequestAllFlow(action) {
    try {
        // grab the client from our action
        const { client } = action;
        // call to our widgetRequestApi function with the client
        const companies = yield call(companyRequestAllApi, client);
        // dispatch the action with our widgets!
        yield put(companyRequestAllSuccess(companies));
    } catch (error) {
        yield put(companyRequestAllError(error));
    }
}

function companyInvitationApi(client, email) {
    console.log('email', email);
    const url = `${baseUrl}/invite/company`;
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...client.token,
        },
        body: JSON.stringify(email),
    });
    return handleRequest(request);
}

function* companyInvitationFlow(action) {
    try {
        const { client, email } = action;

        const result = yield call(companyInvitationApi, client, email);
        yield put (companyEmailSuccess(result));
    } catch (error) {
        yield put(companyEmailError(error));
    }
}

function* companiesWatcher() {
    // each of the below RECEIVES the action from the .. action
    yield [
        takeLatest(COMPANY_CREATING, companyCreateFlow),
        takeLatest(COMPANY_REQUESTING_ONE, companyRequestOneFlow),
        takeLatest(COMPANY_REQUESTING_ALL, companyRequestAllFlow),
        takeLatest(COMPANY_INVITATION_EMAIL, companyInvitationFlow),
    ];
}

export default companiesWatcher;
