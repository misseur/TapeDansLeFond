import PropTypes from 'prop-types';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import TeamIcon from 'material-ui/svg-icons/social/group';
import LeagueIcon from 'material-ui/svg-icons/hardware/videogame-asset';
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new';
import { withStyles } from 'vitaminjs';
import { connect } from 'vitaminjs/react-redux';
import { compose } from 'ramda';

import Tab from './Tab';
import s from './style.css';
import { unsetClient } from '../client/actions';

const propTypes = {
    children: PropTypes.node,
    logout: PropTypes.func.isRequired,
};

const Tabs = ({ children, logout }) =>
    <div className={s['tabs-container']}>
        <div className={s.tabs}>
            <Tab icon={<HomeIcon />} title="Accueil" link="/dashboard" />
            <Tab icon={<TeamIcon />} title="Ma team" link="team" />
            <Tab icon={<LeagueIcon />} title="Ma ligue" link="league" />
            <Tab icon={<BusinessIcon />} title="Mon entreprise" link="company" />
            <Tab icon={<AccountIcon />} title="Mon profil" link="profile" />
            <Tab icon={<PowerIcon />} title="Déconnexion" link="home" onClick={logout} />
        </div>
        {children}
    </div>;

Tabs.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
    logout() {
        console.log('logout');
        dispatch(unsetClient());
    },
});

export default compose(
    connect(null, mapDispatchToProps),
    withStyles(s),
)(Tabs);
