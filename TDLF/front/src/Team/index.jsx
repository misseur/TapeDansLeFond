import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'vitaminjs/react-redux';
import autobind from 'autobind-decorator';
import { compose } from 'ramda';
import MailIcon from 'material-ui/svg-icons/communication/mail-outline';
import AddIcon from 'material-ui/svg-icons/content/add';
import { RaisedButton } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AddForm from './AddForm';

import { teamCreate, teamRequest } from './actions';

class Team extends Component {
    static propTypes = {
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
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({ primary2Color: PropTypes.string.isRequired }),
        }),
        teamRequest: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            creationPending: false,

        };
        // this.fetchTeams();
    }

    fetchTeams() {
        const { client, teamRequest } = this.props;
        if (client && client.token) return teamRequest(client);
        return false;
    }

    handleCreate() {
        this.setState({ creationPending: true });
    }

    handleCancelCreation() {
        this.setState({ creationPending: false });
    }

    render() {
        const {
            teams: { list, requesting },
            muiTheme: { palette: { primary2Color } },
        } = this.props;

        return (
            <div>
                <RaisedButton label="Inviter" labelColor={primary2Color} icon={<MailIcon />} />
                <RaisedButton label="Créer" labelColor={primary2Color} icon={<AddIcon />} onClick={this.handleCreate} />
                <div>
                    { this.state.creationPending && <AddForm onSubmit={this.handleCancelCreation} /> }
                </div>
                <div>
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
                                list.map(
                                    team =>
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
    muiThemeable(),
    autobind,
)(Team);
