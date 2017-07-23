import { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'vitaminjs/react-redux';
import autobind from 'autobind-decorator';
import { compose } from 'ramda';
import { RaisedButton } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Messages from '../../notifications/Messages';
import Errors from '../../notifications/Errors';
import { companyEmail } from '../actions';
import FormTextField from '../../common/FormTextField';

const nameRequired = value => (value ? undefined : 'Name Required');

class EmailForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            token: PropTypes.object.isRequired,
        }),
        company: PropTypes.shape({
            list: PropTypes.object,
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }).isRequired,
        sendEmail: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({ primary2Color: PropTypes.string.isRequired }),
        }),
        hideForm: PropTypes.func.isRequired,
    };

    submit(email) {
        const { client, sendEmail, reset, hideForm } = this.props;
        sendEmail(client, email);
        hideForm();
        // reset the form upon submit.
        reset();
    }

    render() {
        const {
            handleSubmit,
            invalid,
            company: { requesting, successful, messages, errors },
            muiTheme: { palette: { primary2Color } },
        } = this.props;

        return (
            <form>
                <Field
                    name="email"
                    label="Email"
                    type="text"
                    id="email"
                    component={FormTextField}
                    validate={nameRequired}
                />
                <RaisedButton
                    disabled={invalid}
                    action="submit"
                    label="Envoyer"
                    labelColor={primary2Color}
                    onClick={handleSubmit(this.submit)}
                />
                <div>
                    {requesting && <span>Creating company...</span>}
                    {!requesting &&
                        !!errors.length &&
                        <Errors message="Failure to send mail due to:" errors={errors} />}
                    {!requesting &&
                        successful &&
                        !!messages.length &&
                        <Messages messages={messages} />}
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    client: state.client,
    company: state.resources.company,
});

export default compose(
    connect(mapStateToProps, { sendEmail: companyEmail }),
    reduxForm({ form: 'company' }),
    muiThemeable(),
    autobind,
)(EmailForm);
