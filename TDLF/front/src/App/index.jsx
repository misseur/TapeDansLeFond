import { withStyles } from 'vitaminjs';
import Helmet from 'vitaminjs/react-helmet';
import { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import s from '../style.css';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const App = ({ children }) => (
    <MuiThemeProvider>
        <div className={s.app}>
            <Helmet
                title="Tape dans le fond"
                meta={[
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                ]}
            />
            {children}
        </div>
    </MuiThemeProvider>
);

App.propTypes = propTypes;

export default withStyles(s)(App);
