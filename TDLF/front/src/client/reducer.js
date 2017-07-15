import { CLIENT_SET, CLIENT_UNSET, SAVE_JWT_TOKEN } from './constants';

const initialSate = {
    id: null,
    token: null,
    justLoggedOut: false,
};

const reducer = function clientReducer(state = initialSate, action) {
    switch (action.type) {
    case CLIENT_SET:
        return {
            id: action.token.userId,
            token: action.token,
            justLoggedOut: false,
        };
    case CLIENT_UNSET:
        return {
            id: null,
            token: null,
            justLoggedOut: true,
        };
    case SAVE_JWT_TOKEN:
        return { id: action.token.userId, token: action.token };
    default:
        return state;
    }
};

export default reducer;
