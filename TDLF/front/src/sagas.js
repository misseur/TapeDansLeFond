import SignupSaga from './Signup/sagas';
import LoginSaga from './Login/sagas';
import TeamSaga from './Team/sagas';
import CompanySaga from './Company/sagas';
import UserSaga from './User/sagas';

export default function* IndexSaga() {
    yield [
        SignupSaga(),
        LoginSaga(),
        TeamSaga(),
        CompanySaga(),
        UserSaga(),
    ];
}

