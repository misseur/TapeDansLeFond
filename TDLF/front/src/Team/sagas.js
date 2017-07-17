import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import { TEAM_CREATING } from './constants';

import { teamCreateSuccess, teamCreateError } from './actions';

const widgetsUrl = 'http://widgetizer.jcolemorrison.com/api/Clients';

function teamCreateApi(client, team) {
    const url = `${widgetsUrl}/${client.id}/widgets`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // passes our token as an "Authorization" header in
            // every POST request.
            Authorization: client.token.id || undefined, // will throw an error if no login
        },
        body: JSON.stringify(team),
    })
        .then(handleApiErrors)
        .then(response => response.json())
        .then(json => json)
        .catch(error => {
            throw error;
        });
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

function* teamsWatcher() {
    // each of the below RECEIVES the action from the .. action
    yield [takeLatest(TEAM_CREATING, teamCreateFlow)];
}

export default teamsWatcher;
