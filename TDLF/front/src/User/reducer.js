import { createSelector } from 'reselect';
import { SET_USER, USER_REQUESTING, USER_REQUEST_SUCCESS, USER_REQUEST_ERROR } from './constants';
import { COMPANY_CREATE_SUCCESS } from '../Company/constants';

const initialState = {
    list: {},
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
};

function userReducer(state = initialState, action) {
    switch (action.type) {
    case SET_USER:
        return { ...state, list: { ...state.list, [action.user.data.id]: action.user.data } };
    case USER_REQUESTING:
        return {
            ...state, // ensure that we don't erase fetched ones
            requesting: false,
            successful: true,
            messages: [
                {
                    body: 'Fetching companies...!',
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case USER_REQUEST_SUCCESS:
        return {
            list: { ...state.list, [action.user.data.id]: action.user.data },
            requesting: false,
            successful: true,
            messages: [
                {
                    body: 'companies awesomely fetched!',
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case USER_REQUEST_ERROR:
        return {
            requesting: false,
            successful: false,
            messages: [],
            errors: [
                ...state.errors,
                {
                    body: action.error.toString(),
                    time: new Date(),
                },
            ],
        };
    case COMPANY_CREATE_SUCCESS:
        return {
            ...state,
            list: {
                ...state.list,
                [action.user.id]: {
                    ...action.user,
                    relationships: {
                        company: { data: { id: action.company.id, type: 'company' } },
                    },
                },
            },
        };
    default:
        return state;
    }
}

export const userSelector = createSelector(
    state => state.client.id,
    state => state.resources.user.list,
    (id, users) => users && users[id],
);

export default userReducer;
