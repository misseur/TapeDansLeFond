import { SET_USER, USER_REQUESTING, USER_REQUEST_SUCCESS, USER_REQUEST_ERROR } from './constants';

export const setUser = user => ({ type: SET_USER, user });

export const userRequest = client => ({ type: USER_REQUESTING, client });
export const userRequestSuccess = user => ({ type: USER_REQUEST_SUCCESS, user });
export const userRequestError = (error) => ({ type: USER_REQUEST_ERROR, error });
