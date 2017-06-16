import { setClient } from '../client/actions';

function checkAuthorization(dispatch) {
    const storedToken = localStorage.getItem('token');
    console.log('checkAuthorization', storedToken);
    if (storedToken) {
        console.log('checkAuthorization2');
        const token = JSON.parse(storedToken);
        const createdDate = new Date(token.created);
        const created = Math.round(createdDate.getTime() / 1000);
        const ttl = 1209600;
        const expiry = created + ttl;

        // if the token has expired return false
        console.log('TEST', created > expiry);
        if (created > expiry) return false;

        // otherwise, dispatch the token to our setClient action
        dispatch(setClient(token));
        return true;
    }
    return false;
}

export function checkIndexAuthorization({ dispatch }) {
    console.log('checkIndexAuthorization');
    return (nextState, replace, next) => {
        if (checkAuthorization(dispatch)) {
            console.log('checkIndexAuthorization2');
            replace('dashboard');
            return next();
        }
        console.log('checkIndexAuthorization3');
        replace('home');
        return next();
    };
}

export function checkWidgetAuthorization({ dispatch, getState }) {
    console.log('checkWidgetAuthorization');
    return (nextState, replace, next) => {
        const client = getState().client;
        console.log('checkWidgetAuthorization2', client && client.token, checkAuthorization(dispatch));
        if (client && client.token) return next();
        if (checkAuthorization(dispatch)) return next();

        replace('home');
        return next();
    };
}
