import { withStyles } from 'vitaminjs';
import { TextField } from 'material-ui';

import background from './bg-blue.png';
import s from './style.css';
import Logo from './Logo-empty';
import HowItWorks from './HowItWorks';
import LandingBar from './LandingBar';

const Landing = () =>
    <div className={s.index}>
        <LandingBar />
        <div className={s.top}>
            <div
                className={s.bg}
                style={{ background: `transparent url(${background}) 0 0 no-repeat` }}
            />
            <Logo
                color="#FFF"
                hoverColor="#B3E5FC"
                style={{ height: 150, width: 150, zIndex: 0, marginTop: 100 }}
            />
            <div className={s.title}>
                Tape dans le fond
            </div>
            <div className={s.subtitle}>
                La ligue de baby-foot pour les startups
            </div>
            <TextField floatingLabelText="Nom d'utilisateur" />
            <TextField floatingLabelText="Mot de passe" />
        </div>
        <HowItWorks />
        <div style={{ height: 600, width: '100%', backgroundColor: 'white', opacity: 0.5 }} />
        <div style={{ height: 200, width: '100%', backgroundColor: 'darkgreen', opacity: 0.5 }} />
    </div>
;

export default withStyles(s)(Landing);
