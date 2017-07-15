import PropTypes from 'prop-types';
import { Link } from 'vitaminjs/react-router';
import { withStyles } from 'vitaminjs';

import s from './style.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
};

const defaultProps = {
    link: '',
    onClick: () => {},
}

const tabStyle = {
    borderBottom: '3px solid transparent',
    flex: '1 1 0%',
    padding: '10px',
};

const activeStyle = {
    borderBottom: '3px solid white',
};

const Tab = ({ title, icon, link, onClick }) =>
    <Link
        activeStyle={activeStyle}
        style={tabStyle}
        to={link}
        onClick={onClick}
    >
        <div className={s.tab}>
            {icon}
            {title}
        </div>
    </Link>;

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default withStyles(s)(Tab);
