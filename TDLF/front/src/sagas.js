import SignupSaga from './Signup/sagas';
import LoginSaga from './Login/sagas';
import TeamSaga from './Team/sagas';

export default function* IndexSaga() {
    yield [
        SignupSaga(),
        LoginSaga(),
        TeamSaga(),
    ];
}

