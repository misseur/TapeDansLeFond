import { withStyles } from 'vitaminjs';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import StarIcon from 'material-ui/svg-icons/toggle/star-border';
import WhistleIcon from './whistle';

import s from './style.css';

const HowItWorks = () =>
    <div className={s.container}>
        <div className={s.title}>Comment ça marche ?</div>
        <div className={s['block-container']}>
            <div className={s.block}>
                <PeopleIcon color="white" style={{ width: 50, height: 50 }} />
                <div className={s['block-title']}>Crée une équipe</div>
                aux couleurs de ta startup
            </div>
            <div className={s.block}>
                <WhistleIcon color="white" style={{ width: 50, height: 50 }} />
                <div className={s['block-title']}>Rejoins une ligue</div>
                et affronte chaque mois une autre startup
            </div>
            <div className={s.block}>
                <StarIcon color="white" style={{ width: 50, height: 50, marginTop: '-3px', marginBottom: 3 }} />
                <div className={s['block-title']}>Atteins le haut du classement</div>
                et remporte les meilleurs prix !
            </div>
        </div>
    </div>
;

export default withStyles(s)(HowItWorks);
