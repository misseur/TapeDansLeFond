import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'vitaminjs/react-redux';
import autobind from 'autobind-decorator';
import { compose, isNil } from 'ramda';
import { RaisedButton } from 'material-ui';
import MailIcon from 'material-ui/svg-icons/communication/mail-outline';
import AddIcon from 'material-ui/svg-icons/content/add';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { companyCreate, companyRequestOne } from './actions';
import AddForm from './AddForm';
import EmailForm from './EmailForm';
import { userSelector } from '../User/reducer';
import { companySelector } from './reducer';

class Company extends Component {
    static propTypes = {
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            token: PropTypes.object.isRequired,
        }),
        company: PropTypes.object,
        companyRequestOne: PropTypes.func.isRequired,
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({ primary2Color: PropTypes.string.isRequired }),
        }),
        user: PropTypes.shape({
            company: PropTypes.string,
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            creationPending: false,
            mailPending: false,
        };
        this.fetchCompany();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user && this.props.user) {
            this.fetchCompany();
        }
    }

    fetchCompany() {
        const { client, companyRequestOne, user } = this.props;
        if (client && client.token && user && !this.props.company) return companyRequestOne(client);
        return false;
    }

    handleCreate() {
        this.setState({ creationPending: true });
    }

    handleCancelCreation() {
        this.setState({ creationPending: false });
    }

    handleEmail() {
        this.setState({ mailPending: true });
    }

    handleCancelMailing() {
        this.setState({ mailPending: false });
    }

    render() {
        const { client, user, company, muiTheme: { palette: { primary2Color } } } = this.props;
        const userHasCompany = user && user.relationships.company.data;
        //TODO faire les check sur user->company
        console.log('state', this.state);
        return (
            <div>
                {isNil(userHasCompany) &&
                    <RaisedButton
                        label="Créer"
                        labelColor={primary2Color}
                        icon={<AddIcon />}
                        onClick={this.handleCreate}
                    />}
                {!isNil(userHasCompany) &&
                    <RaisedButton
                        label="Inviter"
                        labelColor={primary2Color}
                        icon={<MailIcon />}
                        onClick={this.handleEmail}
                    />}
                <div>
                    {this.state.creationPending &&
                        <AddForm
                            user={user}
                            client={client}
                            hideForm={this.handleCancelCreation}
                        />}
                </div>
                <div>
                    {this.state.mailPending &&
                        <EmailForm client={client} hideForm={this.handleCancelMailing} />}
                </div>
                <div>
                    {!isNil(userHasCompany) &&
                        <div>
                            {company && `${company.name}`}
                            {company && `${company.description}`}
                            <button onClick={this.fetchCompany}>Refetch company!</button>
                        </div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    client: state.client,
    company: companySelector(state),
    user: userSelector(state),
});

export default compose(
    connect(mapStateToProps, { companyCreate, companyRequestOne }),
    muiThemeable(),
    autobind,
)(Company);
