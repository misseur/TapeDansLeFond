import { setClient, unsetClient } from '../client/actions';

function checkAuthorization(dispatch, client) {
    console.log('checkAuthorization')
    const storedToken = client && client.token;
    if (storedToken) {
        const token = storedToken;
        const createdDate = new Date(token.created);
        const created = Math.round(createdDate.getTime() / 1000);
        const ttl = 1209600;
        const expiry = created + ttl;

        // if the token has expired return false
        //TODO FIXME
        if (created > expiry) {
            console.log('token expired');
            dispatch(unsetClient());
            return false;
        }

        // otherwise, dispatch the token to our setClient action
        dispatch(setClient(token));
        return true;
    }
    return false;
}

export function checkIndexAuthorization({ dispatch, getState }) {
    console.log('checkIndexAuthorization')
    const client = getState().client;
    return (nextState, replace, next) => {
        // console.log('NS', nextState);
        if (checkAuthorization(dispatch, client)) {
            replace('dashboard');
            return next();
        }
        return next();
    };
}

export function checkWidgetAuthorization({ dispatch, getState }) {
    console.log('checkWidgetAuthorization')
    return (nextState, replace, next) => {
        // console.log('NS2', nextState);
        const client = getState().client;
        if (client && client.token) return next();
        if (checkAuthorization(dispatch, client)) return next();

        replace('home');
        return next();
    };
}
