import {
    TEAM_CREATING,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_ERROR,
    TEAM_REQUESTING,
    TEAM_REQUEST_SUCCESS,
    TEAM_REQUEST_ERROR,
} from './constants';

const initialState = {
    list: [],
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
};

function teamReducer(state = initialState, action) {
    switch (action.type) {
    case TEAM_CREATING:
        return {
            ...state,
            requesting: true,
            successful: false,
            messages: [
                {
                    body: `Widget: ${action.team.name} being created...`,
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case TEAM_CREATE_SUCCESS:
        return {
            list: state.list.concat([action.team]),
            requesting: false,
            successful: true,
            messages: [
                {
                    body: `Widget: ${action.team.name} awesomely created!`,
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case TEAM_CREATE_ERROR:
        return {
            ...state,
            requesting: false,
            successful: false,
            messages: [],
            errors: state.errors.concat([
                {
                    body: action.error.toString(),
                    time: new Date(),
                },
            ]),
        };
    case TEAM_REQUESTING:
        return {
            ...state, // ensure that we don't erase fetched ones
            requesting: false,
            successful: true,
            messages: [
                {
                    body: 'Fetching teams...!',
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case TEAM_REQUEST_SUCCESS:
        return {
            list: action.teams, // replace with fresh list
            requesting: false,
            successful: true,
            messages: [
                {
                    body: 'Teams awesomely fetched!',
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case TEAM_REQUEST_ERROR:
        return {
            requesting: false,
            successful: false,
            messages: [],
            errors:
                state.errors.concat[{
                    body: action.error.toString(),
                    time: new Date(),
                }],
        };
    default:
        return state;
    }
}

export default teamReducer;
