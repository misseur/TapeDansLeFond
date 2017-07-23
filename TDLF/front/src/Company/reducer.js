import { createSelector } from 'reselect';

import {
    COMPANY_CREATING,
    COMPANY_CREATE_SUCCESS,
    COMPANY_CREATE_ERROR,
    COMPANY_REQUESTING_ONE,
    COMPANY_REQUEST_ONE_SUCCESS,
    COMPANY_REQUEST_ONE_ERROR,
    COMPANY_REQUESTING_ALL,
    COMPANY_REQUEST_ALL_SUCCESS,
    COMPANY_REQUEST_ALL_ERROR,
    COMPANY_INVITATION_EMAIL,
    COMPANY_INVITATION_EMAIL_SUCCESS,
    COMPANY_INVITATION_EMAIL_ERROR,
} from './constants';

const initialState = {
    list: {},
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
};

function companyReducer(state = initialState, action) {
    switch (action.type) {
    case COMPANY_CREATING:
        return {
            ...state,
            requesting: true,
            successful: false,
            messages: [
                {
                    body: `Company: ${action.company.name} being created...`,
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case COMPANY_CREATE_SUCCESS:
        return {
            list: { ...state.list, [action.company.id]: action.company },
            requesting: false,
            successful: true,
            messages: [
                {
                    body: `Company: ${action.company.name} awesomely created!`,
                    time: new Date(),
                },
            ],
            errors: [],
        };

    case COMPANY_CREATE_ERROR:
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
    case COMPANY_REQUESTING_ONE:
        return {
            // list: { ...state.list, [action.company.id]: action.company },
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

    case COMPANY_REQUEST_ONE_SUCCESS:
        return {
            list: { ...state.list, [action.company.id]: action.company },
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

    case COMPANY_REQUEST_ONE_ERROR:
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
    case COMPANY_REQUESTING_ALL:
        return {
            ...state, // ensure that we don't erase fetched ALLs
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

    case COMPANY_REQUEST_ALL_SUCCESS:
        return {
            list: action.companies, // replace with fresh list
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

    case COMPANY_REQUEST_ALL_ERROR:
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
    case COMPANY_INVITATION_EMAIL:
        return {
            ...state,
            requesting: true,
            successful: false,
            messages: [
                {
                    body: `Company: Email being sent...`,
                    time: new Date(),
                },
            ],
            errors: [],
        };
    case COMPANY_INVITATION_EMAIL_SUCCESS:
        return {
            ...state,
            requesting: false,
            successful: true,
            messages: [
                {
                    body: 'Company: Email envoyé',
                    time: new Date(),
                },
            ],
            errors: [],
        };
    case COMPANY_INVITATION_EMAIL_ERROR:
        return {
            ...state,
            requesting: false,
            successful: false,
            messages: [],
            errors: state.errors.concat[{
                body: action.error.toString(),
                time: new Date(),
            }],
        };
    default:
        return state;
    }
}

export const companySelector = createSelector(
    state => state.client.id,
    state => state.resources.user.list,
    state => state.resources.company.list,
    (id, users, companies) => {
        if (!id || !users || !users[id] || !users[id].relationships.company.data) return null;
        const companyId = users[id].relationships.company.data.id;
        return companies[companyId];
    },
);

export default companyReducer;
