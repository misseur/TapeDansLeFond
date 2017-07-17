import { combineReducers } from 'vitaminjs/redux';
import team from '../Team/reducer';

const resources = combineReducers({
    team,
});

export default resources;
