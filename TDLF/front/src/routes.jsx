import { Route, IndexRedirect } from 'vitaminjs/react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Landing from './Landing';
import LoginPopup from './LoginPopup';

if (IS_CLIENT) {
    try {
        injectTapEventPlugin();
    } catch (e) {}
}

if (process.env.NODE_ENV !== 'production') {
    (IS_CLIENT ? window : global).trace = (...logs) => x => console.log(...logs, x) || x;
}


export default (
    <Route path="/" component={App}>
        <IndexRedirect to="home" />
        <Route path="home" component={Landing} />
        <Route path="login" component={LoginPopup} />
    </Route>
);
