import { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui';
import { compose } from 'ramda';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { Motion, spring } from 'react-motion';
import autobind from 'autobind-decorator';
import { lightBlue300 } from 'material-ui/styles/colors';
import { withStyles } from 'vitaminjs';

import s from './style.css';

class Popup extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClose: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        };
    }
    componentDidMount() {
        //eslint-disable-next-line
        this.setState({ isOpened: true });
    }

    render() {
        const { onClose, children } = this.props;
        return (
            <Motion
                defaultStyle={{ position: 100 }}
                style={{
                    position: spring(
                            this.state.isOpened === false ? 100 : 0,
                            { stiffness: 500, damping: 40 },
                        ),
                }}
            >
                {style =>
                    <div
                        className={s.container}
                        style={{
                            backgroundColor: lightBlue300,
                            transform: `translateX(${style.position}vw)`,
                        }}
                    >
                        <IconButton
                            className={s.icon}
                            iconStyle={{ width: '32px', height: '32px' }}
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        {children}
                    </div>
                }
            </Motion>
        );
    }
}

export default compose(
    autobind,
    withStyles(s),
)(Popup);
