import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import { compose } from 'ramda';
import autobind from 'autobind-decorator';
import FaceIcon from 'material-ui/svg-icons/action/face';
import BulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import SeatIcon from 'material-ui/svg-icons/action/event-seat';
import EqualizerIcon from 'material-ui/svg-icons/av/equalizer';
import { Motion, spring } from 'react-motion';

import LoginPopup from '../../LoginPopup';

import s from './style.css';

const menuItems = handleDisplayLoginModal => [
    {
        title: 'Connexion',
        Icon: AccountIcon,
        link: handleDisplayLoginModal,
    },
    {
        title: 'Inscription',
        Icon: SeatIcon,
        link: handleDisplayLoginModal,
    },
    {
        title: 'Comment ça marche',
        Icon: BulbIcon,
        link: handleDisplayLoginModal,
    },
    {
        title: 'Qui sommes-nous ?',
        Icon: FaceIcon,
        link: handleDisplayLoginModal,
    },
    {
        title: 'En chiffres',
        Icon: EqualizerIcon,
        link: handleDisplayLoginModal,
    },
];

class LandingBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: null,
            showLoginModal: false,
        };
    }
    setFocused(i) {
        this.setState(() => ({ focused: i }));
    }
    removeFocused() {
        this.setState(() => ({ focused: null }));
    }
    handleDisplayLoginModal() {
        document.body.style.overflow = 'hidden';
        this.setState({ showLoginModal: true });
    }

    handleCloseLoginModal() {
        document.body.style.overflow = 'initial';
        this.setState({ showLoginModal: false });
    }

    render() {
        const { focused } = this.state;
        return (
            <ul className={s.menu}>
                {menuItems(this.handleDisplayLoginModal).map((item, i) =>
                    <Motion
                        key={item.title}
                        style={{
                            iconSize: spring(
                                focused === i ? 40 : 30,
                                { stiffness: 450, damping: 40 },
                            ),
                            width: spring(
                                focused === i ? 200 : 40,
                                { stiffness: 450, damping: 30 },
                            ),
                            opacity: spring(
                                focused === i ? 1 : 0,
                                { stiffness: 100, damping: 30 },
                            ),
                            textWidth: spring(
                                focused === i ? 160 : 0,
                                { stiffness: 450, damping: 30 },
                            ),
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
                                        borderTopRightRadius:
                                            i === 0 || i === focused ? '3px' : 0,
                                        borderBottomRightRadius:
                                            i === 4 || i === focused ? '3px' : 0,

                                    }}
                                    onMouseOver={() => this.setFocused(i)}
                                    onMouseLeave={() => this.removeFocused()}
                                    onClick={item.link}
                                >
                                    <item.Icon
                                        style={{
                                            width: 30,
                                            height: 30,
                                            marginRight: '8px',
                                        }}
                                    />
                                    { focused === i ?
                                        <span
                                            style={{
                                                opacity: style.opacity,
                                                width: style.textWidth,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.title.replace(/ /gi, '\u00a0')}
                                        </span> : null
                                    }
                                </div>
                            </li>
                        }
                    </Motion>,
                )}
                {this.state.showLoginModal && <LoginPopup onClose={this.handleCloseLoginModal} />}
            </ul>
        );
    }
}

export default compose(
    withStyles(s),
    autobind,
)(LandingBar);

