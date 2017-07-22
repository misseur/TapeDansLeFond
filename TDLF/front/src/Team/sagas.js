import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { TEAM_CREATING, TEAM_REQUESTING } from './constants';

import {
    teamCreateSuccess,
    teamCreateError,
    teamRequestSuccess,
    teamRequestError,
} from './actions';

// const teamUrl = 'http://widgetizer.jcolemorrison.com/api/Clients';
const teamUrl = 'http://localhost:9500/team';

function handleRequest(request) {
    return request
        .then(handleApiErrors)
        .then(response => response.json())
        .then(json => json)
        .catch(error => {
            throw error;
        });
}

function teamCreateApi(client, team) {
    // const url = `${teamUrl}/${client.id}/widgets`;
    const url = `${teamUrl}/create`;
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // passes our token as an "Authorization" header in
            // every POST request.
            // Authorization: client.token.id || undefined, // will throw an error if no login
            ...client.token,
        },
        body: JSON.stringify(team),
    });
    return handleRequest(request);
}

function* teamCreateFlow(action) {
    try {
        const { client, team } = action;
        const createdTeam = yield call(teamCreateApi, client, team);
        // creates the action with the format of
        // {
        //   type: TEAM_CREATE_SUCCESS,
        //   team,
        // }
        // Which we could do inline here, but again, consistency
        yield put(teamCreateSuccess(createdTeam));
    } catch (error) {
        // same with error
        yield put(teamCreateError(error));
    }
}

function teamRequestApi(client) {
    // const url = `${teamUrl}/${client.id}/widgets`;
    const url = `${teamUrl}/player`;
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

function* teamRequestFlow(action) {
    try {
        // grab the client from our action
        const { client } = action;
        // call to our widgetRequestApi function with the client
        const teams = yield call(teamRequestApi, client);
        // dispatch the action with our widgets!
        yield put(teamRequestSuccess(teams));
    } catch (error) {
        yield put(teamRequestError(error));
    }
}
function* teamsWatcher() {
    // each of the below RECEIVES the action from the .. action
    yield [takeLatest(TEAM_CREATING, teamCreateFlow), takeLatest(TEAM_REQUESTING, teamRequestFlow)];
}

export default teamsWatcher;
