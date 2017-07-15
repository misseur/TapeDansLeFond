import {
    TEAM_CREATING,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_ERROR,
} from './constants';

const initialState = {
    list: [],
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
};

const reducer = function widgetReducer(state = initialState, action) {
    switch (action.type) {
    case TEAM_CREATING:
        return {
            ...state,
            requesting: true,
            successful: false,
            messages: [{
                body: `Widget: ${action.team.name} being created...`,
                time: new Date(),
            }],
            errors: [],
        };

    case TEAM_CREATE_SUCCESS:
        return {
            list: state.list.concat([action.team]),
            requesting: false,
            successful: true,
            messages: [{
                body: `Widget: ${action.team.name} awesomely created!`,
                time: new Date(),
            }],
            errors: [],
        };

    case TEAM_CREATE_ERROR:
        return {
            ...state,
            requesting: false,
            successful: false,
            messages: [],
            errors: state.errors.concat([{
                body: action.error.toString(),
                time: new Date(),
            }]),
        };

    default:
        return state;
    }
};

export default reducer;
