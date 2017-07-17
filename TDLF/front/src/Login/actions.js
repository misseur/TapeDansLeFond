import {
  LOGIN_REQUESTING,
} from './constants';

function loginRequest({ email, password }) {
    return {
        type: LOGIN_REQUESTING,
        email,
        password,
    };
}


export default loginRequest;
