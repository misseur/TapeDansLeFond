import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { COMPANY_CREATING, COMPANY_REQUESTING_ONE, COMPANY_REQUESTING_ALL } from './constants';

import {
    companyCreateSuccess,
    companyCreateError,
    companyRequestOneSuccess,
    companyRequestOneError,
    companyRequestAllSuccess,
    companyRequestAllError,
} from './actions';

// const companyUrl = 'http://widgetizer.jcolemorrison.com/api/Clients';
// LOL
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
    // const url = `${companyUrl}/${client.id}/widgets`;
    const url = `${companyUrl}/create`;
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // passes our token as an "Authorization" header in
            // every POST request.
            // Authorization: client.token.id || undefined, // will throw an error if no login
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
        // creates the action with the format of
        // {
        //   type: COMPANY_CREATE_SUCCESS,
        //   company,
        // }
        // Which we could do inline here, but again, consistency
        yield put(companyCreateSuccess(createdCompany, user));
    } catch (error) {
        // same with error
        yield put(companyCreateError(error));
    }
}

function companyRequestOneApi(client) {
    // const url = `${companyUrl}/${client.id}/widgets`;
    const url = `${userUrl}/company`;
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


function* companiesWatcher() {
    // each of the below RECEIVES the action from the .. action
    yield [
        takeLatest(COMPANY_CREATING, companyCreateFlow),
        takeLatest(COMPANY_REQUESTING_ONE, companyRequestOneFlow),
        takeLatest(COMPANY_REQUESTING_ALL, companyRequestAllFlow),
    ];
}

export default companiesWatcher;
