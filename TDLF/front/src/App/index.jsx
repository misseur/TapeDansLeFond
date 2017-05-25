import { withStyles } from 'vitaminjs';
import Helmet from 'vitaminjs/react-helmet';
import { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white, lightBlue50, lightBlue300 } from 'material-ui/styles/colors';

import s from '../style.css';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const muiTheme = getMuiTheme({
    palette: {
        textColor: white,
        primary1Color: white,
        primary2Color: lightBlue300,
        borderColor: white,
        disabledColor: lightBlue50,
    },
    fontFamily: 'Josefin Sans',
    borderColor: white,
    appBar: {
        height: 50,
    },
    userAgent: 'all',
});

const App = ({ children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
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
