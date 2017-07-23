import { combineReducers } from 'vitaminjs/redux';
import team from '../Team/reducer';
import company from '../Company/reducer';
import user from '../User/reducer';

const resources = combineReducers({
    team,
    company,
    user,
});

export default resources;
