import { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'vitaminjs/react-redux';
import autobind from 'autobind-decorator';
import { compose } from 'ramda';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';
import FormTextField from '../common/FormTextField';

import { teamCreate, teamRequest } from './actions';

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
        teamRequest: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        // this.fetchTeams();
    }

    fetchTeams() {
        const { client, teamRequest } = this.props;
        if (client && client.token) return teamRequest(client);
        return false;
    }

    submit(team) {
        const { client, teamCreate, reset } = this.props;
        teamCreate(client, team);
        // reset the form upon submit.
        reset();
    }
    render() {
        console.log('props', this.props);
        const {
            handleSubmit,
            invalid,
            teams: { list, requesting, successful, messages, errors },
        } = this.props;

        return (
            <div className="widgets">
                <div className="widget-form">
                    <form onSubmit={handleSubmit(this.submit)}>
                        <h1>CREATE THE TEAM</h1>
                        <label htmlFor="name">Name</label>
                        <Field
                            name="name"
                            label="Nom"
                            type="text"
                            id="name"
                            component={FormTextField}
                            validate={nameRequired}
                        />
                        <button disabled={invalid} action="submit">
                            CREATE
                        </button>
                    </form>
                    <hr />
                    <div className="widget-messages">
                        {requesting && <span>Creating team...</span>}
                        {!requesting &&
                            !!errors.length &&
                            <Errors message="Failure to create Widget due to:" errors={errors} />}
                        {!requesting &&
                            successful &&
                            !!messages.length &&
                            <Messages messages={messages} />}
                    </div>
                </div>
                <div className="widget-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list &&
                                !!list.length &&
                                list.map(team => console.log('team', team) ||
                                    <tr key={team.id}>
                                        <td>
                                            <strong>{`${team.name}`}</strong>
                                        </td>
                                        <td>
                                            {`${team.description}`}
                                        </td>
                                        <td>
                                            {`${team.size}`}
                                        </td>
                                    </tr>,
                                )}
                        </tbody>
                    </table>
                    {/* A convenience button to refetch on demand */}
                    <button onClick={this.fetchTeams}>Refetch teams!</button>
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
    connect(mapStateToProps, { teamCreate, teamRequest }),
    reduxForm({ form: 'teams' }),
    autobind,
)(Team);
