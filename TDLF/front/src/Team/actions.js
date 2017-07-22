import {
    TEAM_CREATING,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_ERROR,
    TEAM_REQUESTING,
    TEAM_REQUEST_SUCCESS,
    TEAM_REQUEST_ERROR,
} from './constants';

export const teamCreate = function teamCreate(client, team) {
    return {
        type: TEAM_CREATING,
        client,
        team,
    };
};

export const teamCreateSuccess = function teamCreateSuccess(team) {
    return {
        type: TEAM_CREATE_SUCCESS,
        team,
    };
};

export const teamCreateError = function teamCreateError(error) {
    return {
        type: TEAM_CREATE_ERROR,
        error,
    };
};

export const teamRequest = function teamRequest(client) {
    return {
        type: TEAM_REQUESTING,
        client,
    };
};

export const teamRequestSuccess = function teamRequestSuccess(teams) {
    return {
        type: TEAM_REQUEST_SUCCESS,
        teams,
    };
};

export const teamRequestError = function teamRequestError(error) {
    return {
        type: TEAM_REQUEST_ERROR,
        error,
    };
};
