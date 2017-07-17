import { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'vitaminjs/react-redux';
import autobind from 'autobind-decorator';
import { compose } from 'ramda';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';
import FormTextField from '../common/FormTextField';

import { teamCreate } from './actions';

const nameRequired = value => (value ? undefined : 'Name Required');

class Team extends Component {
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
        teamCreate: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    submit(team) {
        const { client, teamCreate, reset } = this.props;
        // call to our widgetCreate action.
        teamCreate(client, team);
        // reset the form upon submit.
        reset();
    }
    render() {
        // pull in all needed props for the view
        // `invalid` is a value that Redux Form injects
        // that states whether or not our form is valid/invalid.
        // This is only relevant if we are using the concept of
        // `validators` in our form.
        // debugger;
        const {
            handleSubmit,
            invalid,
            teams: { list, requesting, successful, messages, errors },
        } = this.props;

        return (
            <div className="widgets">
                <div className="widget-form">
                    <form onSubmit={handleSubmit(this.submit)}>
                        <h1>CREATE THE WIDGET</h1>
                        <label htmlFor="name">Name</label>
                        {/* We will use a custom component AND a validator */}
                        <Field
                            name="name"
                            label="Nom"
                            type="text"
                            id="name"
                            component={FormTextField}
                            validate={nameRequired}
                        />
                        <label htmlFor="description">Description</label>
                        <Field
                            name="description"
                            label="description"
                            type="text"
                            id="description"
                            component={FormTextField}
                        />
                        <label htmlFor="size">Size</label>
                        <Field
                            name="size"
                            label="size"
                            type="number"
                            id="size"
                            component={FormTextField}
                        />
                        {/* the button will remain disabled until not invalid */}
                        <button disabled={invalid} action="submit">
                            CREATE
                        </button>
                    </form>
                    <hr />
                    <div className="widget-messages">
                        {requesting && <span>Creating widget...</span>}
                        {!requesting &&
                            !!errors.length &&
                            <Errors message="Failure to create Widget due to:" errors={errors} />}
                        {!requesting &&
                            successful &&
                            !!messages.length &&
                            <Messages messages={messages} />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    client: state.client,
    teams: state.resources.team,
});

export default compose(
    connect(mapStateToProps, { teamCreate }),
    reduxForm({ form: 'teams' }),
    autobind,
)(Team);
