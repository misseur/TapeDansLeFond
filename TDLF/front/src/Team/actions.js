import {
    TEAM_CREATING,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_ERROR,
} from './constants';

// Create requires that we pass it our current logged in client AND widget params
// which you can view at http://widgetizer.jcolemorrison.com/explorer OR at
// localhost:3002/explorer if you're using the local API version.
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
