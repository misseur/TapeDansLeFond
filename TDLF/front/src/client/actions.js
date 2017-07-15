import { push } from 'vitaminjs/react-router-redux';

import { CLIENT_SET, CLIENT_UNSET, SAVE_JWT_TOKEN } from './constants';

export function setClient(token) {
    return {
        type: CLIENT_SET,
        token,
    };
}

export const saveJWTToken = JWTToken => dispatch => (JWTToken && JWTToken.length > 5 ?
    dispatch({
        type: SAVE_JWT_TOKEN, token: JSON.parse(decodeURIComponent(JWTToken)),
    }) : null
);

export const unsetClient = () => dispatch => {
    dispatch({
        type: CLIENT_UNSET,
    });
    document.cookie = 'jwt=';
    // TODO FIX ME
    location.reload();
};
