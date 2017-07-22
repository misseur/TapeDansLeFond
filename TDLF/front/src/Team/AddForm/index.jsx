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
import { teamCreate } from '../actions';
import FormTextField from '../../common/FormTextField';

const nameRequired = value => (value ? undefined : 'Name Required');

class AddForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            token: PropTypes.object.isRequired,
        }),
        teams: PropTypes.shape({
            list: PropTypes.array,
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }).isRequired,
        create: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({ primary2Color: PropTypes.string.isRequired }),
        }),
    };

    submit(team) {
        const { client, create, reset } = this.props;
        create(client, team);
        // reset the form upon submit.
        reset();
    }

    render() {
        const {
            handleSubmit,
            invalid,
            teams: { requesting, successful, messages, errors },
            muiTheme: { palette: { primary2Color } },
        } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field
                    name="name"
                    label="Nom"
                    type="text"
                    id="name"
                    component={FormTextField}
                    validate={nameRequired}
                />
                <RaisedButton
                    disabled={invalid}
                    labelColor={primary2Color}
                    label="Créer"
                    onClick={handleSubmit(this.submit)}
                />
                <div>
                    {requesting && <span>Creating team...</span>}
                    {!requesting &&
                        !!errors.length &&
                        <Errors message="Failure to create Widget due to:" errors={errors} />}
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
    teams: state.resources.team,
});

export default compose(
    connect(mapStateToProps, { create: teamCreate }),
    reduxForm({ form: 'teams' }),
    muiThemeable(),
    autobind,
)(AddForm);
