import HomeIcon from "material-ui/svg-icons/action/home";
import AccountIcon from "material-ui/svg-icons/action/account-circle";
import BusinessIcon from "material-ui/svg-icons/communication/business";
import TeamIcon from "material-ui/svg-icons/social/group";
import LeagueIcon from "material-ui/svg-icons/hardware/videogame-asset";
import { white, lightBlue300 } from "material-ui/styles/colors";
import { withStyles } from 'vitaminjs';

import Tab from "./Tab";
import s from './style.css';

const Tabs = ({ location: { pathname }, children }) =>
    <div className={s['tabs-container']}>
        <div className={s.tabs}>
            <Tab
                icon={<HomeIcon />}
                title="Accueil"
                link="/dashboard"
                pathname={pathname}
            />
            <Tab
                icon={<TeamIcon />}
                title="Ma team"
                link="team"
                pathname={pathname}
            />
            <Tab
                icon={<LeagueIcon />}
                title="Ma ligue"
                link="league"
                pathname={pathname}
            />
            <Tab
                icon={<BusinessIcon />}
                title="Mon entreprise"
                link="company"
                pathname={pathname}
            />
            <Tab
                icon={<AccountIcon />}
                title="Mon profil"
                link="profile"
                pathname={pathname}
            />
        </div>
        {children}
    </div>
;

export default withStyles(s)(Tabs);
