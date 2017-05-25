import { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'vitaminjs/react-redux';
import { compose } from 'ramda';
import { RaisedButton } from 'material-ui';
import { Link } from 'vitaminjs/react-router';
import autobind from 'autobind-decorator';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { signupRequest } from './actions';
import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';
import Popup from '../common/Popup';
import FormTextField from '../common/FormTextField';

class Signup extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        signupRequest: PropTypes.func,
        signup: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({ primary2Color: PropTypes.string.isRequired }),
        }),
        onClose: PropTypes.func.isRequired,
    };

    submit(values) {
        this.props.signupRequest(values);
    }

    render() {
        const {
            handleSubmit,
            signup: {
                requesting,
                successful,
                messages,
                errors,
            },
            muiTheme: { palette: { primary2Color } },
            onClose,
        } = this.props;
        return (
            <Popup onClose={onClose}>
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
                        label="Enregistrer"
                        labelColor={primary2Color}
                        style={{ margin: '16px 0' }}
                    />
                </form>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {!requesting && !!errors.length && (
                        <Errors message="Failure to signup due to:" errors={errors} />
                    )}
                    {!requesting && !!messages.length && (
                        <Messages messages={messages} />
                    )}
                    {!requesting && successful && (
                        <div>
                            Signup Successful! <Link to="/login">» Se connecter »</Link>
                        </div>
                    )}
                    {!requesting && !successful && (
                        <Link to="/login">Déjà membre ? » Se connecter »</Link>
                    )}
                </div>
            </Popup>
        );
    }
}

const mapStateToProps = state => ({
    signup: state.signup,
});

export default compose(
    connect(mapStateToProps, { signupRequest }),
    reduxForm({ form: 'signup' }),
    autobind,
    muiThemeable(),
)(Signup);
