import { reducer as form } from 'redux-form';
import client from './client/reducer';
import signup from './Signup/reducer';
import login from './Login/reducer';

export default {
    form,
    client,
    signup,
    login,
};
