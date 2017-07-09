import { Route, IndexRedirect, IndexRoute } from 'vitaminjs/react-router';
import 'regenerator-runtime/runtime';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import Landing from './Landing';
import sagaMiddleware from './middlewares/saga';
import IndexSagas from './sagas';
import Dashboard from './Dashboard/components';
import {
    checkIndexAuthorization,
    checkWidgetAuthorization,
} from './lib/check-auth';
import Team from './Team';
import Tabs from './Tabs';

if (IS_CLIENT) {
    try {
        injectTapEventPlugin();
    } catch (e) {}
}

function runSaga() {
    if (IS_CLIENT) {
        if (window.__SAGA_TASK__) window.__SAGA_TASK__.cancel();
        window.__SAGA_TASK__ = sagaMiddleware.run(IndexSagas);
    } else {
        sagaMiddleware.run(IndexSagas);
    }
}

// const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
// ;

if (process.env.NODE_ENV !== 'production') {
    (IS_CLIENT ? window : global).trace = (...logs) => x => console.log(...logs, x) || x;
}

export default async (store) => {
    runSaga();
    return (
        <Route path="/" component={App}>
            {/* <IndexRoute onEnter={checkIndexAuthorization(store)} />*/}
            <IndexRedirect to="home" />
            <Route path="home" component={Landing} />
            <Route
                // onEnter={checkWidgetAuthorization(store)}
                // path="dashboard"
                path="/"
                component={Tabs}
            >
                <Route path="/dashboard" component={Dashboard} />
                <Route path="team" component={Team} />
                <Route path="league" component={Team} />
                <Route path="company" component={Team} />
                <Route path="profile" component={Team} />
            </Route>
        </Route>
    );
};
