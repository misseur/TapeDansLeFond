import SignupSaga from './Signup/sagas';

export default function* IndexSaga() {
    yield [
        SignupSaga(),
    ];
}

