import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import autobind from 'autobind-decorator';
import FaceIcon from 'material-ui/svg-icons/action/face';
import BulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import SeatIcon from 'material-ui/svg-icons/action/event-seat';
import EqualizerIcon from 'material-ui/svg-icons/av/equalizer';
import Divider from 'material-ui/Divider';
import { Motion, spring } from 'react-motion';


import s from './style.css';

const menuItems = [
    {
        title: 'Connexion',
        Icon: AccountIcon,
    },
    {
        title: 'Inscription',
        Icon: SeatIcon,
    },
    // {
    //     Icon: Divider,
    // },
    {
        title: 'Comment ça marche',
        Icon: BulbIcon,
    },
    {
        title: 'Qui sommes-nous ?',
        Icon: FaceIcon,
    },
    {
        title: 'En chiffres',
        Icon: EqualizerIcon,
    },
];

class LandingBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: null,
        };
    }

    setFocused(i) {
        this.setState(() => ({ focused: i }));
    }

    removeFocused() {
        this.setState(() => ({ focused: null }));
    }

    render() {
        // debugger;
        return (
            <ul className={s.menu}>
                {menuItems.map((item, i) =>
                    <Motion
                        key={item.title}
                        style={{
                            iconSize: spring(this.state.focused === i ? 40 : 30, { stiffness: 450, damping: 40 }),
                            width: spring(this.state.focused === i ? 200 : 40, { stiffness: 450, damping: 30 }),
                            opacity: spring(this.state.focused === i ? 1 : 0, { stiffness: 100, damping: 30 }),
                        }}
                    >
                        {style =>
                            <li>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        padding: '8px',
                                        height: '40px',
                                        width: style.width,
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        borderTopRightRadius: i === 0 || i === this.state.focused ? '3px' : 0,
                                        borderBottomRightRadius: i === 4 || i === this.state.focused ? '3px' : 0,

                                    }}
                                    onMouseOver={() => this.setFocused(i)}
                                    onMouseLeave={() => this.removeFocused()}
                                >
                                    <item.Icon
                                        style={{
                                            width: 30,
                                            height: 30,
                                            marginRight: '8px',
                                            // padding: 8,
                                        }}
                                    />
                                    { this.state.focused === i ? <span style={{ opacity: style.opacity }}>{item.title.replace(/ /gi, '\u00a0')}</span> : null }
                                </div>
                            </li>
                        }
                    </Motion>,
                )}
            </ul>
        );
    }
};

// const Separator = () => <span style={{ margin: '0 8px' }}>✦</span>;

// const LandingBar = () =>
//     <ul
//         className={s.bar}
//         style={{
//             backgroundColor: 'transparent',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 1,
//             display: 'flex',
//             justifyContent: 'center',
//             listStyle: 'none',
//         }}
//     >
//     <div style={{ backgroundColor: 'blue' }} />
//         <li>Concept</li>
//         <Separator />
//         <li>Se connecter</li>
//         <Separator />
//         <li>Créer un compte</li>
//         <Separator />
//         <li>En détail</li>
//     </ul>
// ;

export default compose(
    withStyles(s),
    autobind,
)(LandingBar);

