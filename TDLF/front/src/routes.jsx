import { Route, IndexRedirect } from 'vitaminjs/react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Landing from './Landing';

if (IS_CLIENT) {
    try {
        injectTapEventPlugin();
    } catch (e) {}
}

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="home" />
        <Route path="home" component={Landing} />
    </Route>
);
