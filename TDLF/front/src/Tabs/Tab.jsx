import PropTypes from 'prop-types';
import { Link } from 'vitaminjs/react-router';
import { withStyles } from 'vitaminjs';

import s from './style.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    link: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
};

const isActive = (path, routeToTest) => path === routeToTest || path === `/${routeToTest}`;

const tabStyle = isActive => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: isActive ? '3px solid white' : '3px solid transparent',
    flex: '1 1 0%',
    padding: '10px',
});

const Tab = ({ title, icon, link, pathname }) =>
    <Link style={tabStyle(isActive(pathname, link))} to={link}>
        <div className={s.tab}>
            {icon}
            {title}
        </div>
    </Link>
;

Tab.propTypes = propTypes;

export default withStyles(s)(Tab);
