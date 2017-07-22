import { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'vitaminjs/react-redux';
import { compose } from 'ramda';
import { RaisedButton } from 'material-ui';
import autobind from 'autobind-decorator';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';
import Popup from '../common/Popup';
import FormTextField from '../common/FormTextField';
import loginRequest from './actions';

class Login extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        loginRequest: PropTypes.func,
        login: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({ primary2Color: PropTypes.string.isRequired }),
        }),
        onClose: PropTypes.func.isRequired,
        goToSignup: PropTypes.func.isRequired,
    }

    submit(values) {
        this.props.loginRequest(values);
    }

    render() {
        const {
            handleSubmit,
            login: {
                requesting,
                successful,
                messages,
                errors,
            },
            muiTheme: { palette: { primary2Color } },
            onClose,
            goToSignup,
        } = this.props;
        return (
            <Popup onClose={onClose}>
                <h1>Connexion</h1>
                <form
                    className="widget-form"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Field
                        name="email"
                        type="text"
                        id="email"
                        className="email"
                        label="E-mail"
                        component={FormTextField}
                    />
                    <Field
                        name="password"
                        type="password"
                        id="password"
                        className="password"
                        label="Mot de passe"
                        component={FormTextField}
                    />
                    <RaisedButton
                        onClick={handleSubmit(this.submit)}
                        label="Se connecter"
                        labelColor={primary2Color}
                        style={{ margin: '16px 0' }}
                    />
                </form>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {!requesting && !!errors.length && (
                        <Errors message="Failure to login due to:" errors={errors} />
                    )}
                    {!requesting && !!messages.length && (
                        <Messages messages={messages} />
                    )}
                    {!requesting && !successful && (
                        <div onClick={goToSignup} style={{ cursor: 'pointer' }}>
                            {"Pas encore membre ? » S'enregistrer »"}
                        </div>
                    )}
                </div>
            </Popup>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login,
});

export default compose(
    connect(mapStateToProps, { loginRequest }),
    reduxForm({ form: 'login' }),
    muiThemeable(),
    autobind,
)(Login);
