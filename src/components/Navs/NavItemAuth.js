import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

const NavItemAuth = ({ userId, navItemsStyle, navOption }) => {
  let location = useLocation();
  let history = useHistory();
  const { menuItem, menuIcon, menuText } = navItemsStyle;
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const clicked = () => {
    if (userId) {
      history.push('/signout');
    } else {
      history.push('/auth');
    }
  };

  return (
    <MenuItem
      style={menuItem}
      selected={currentPath === '/auth' || currentPath === '/signout'}
      onClick={clicked}>
      <ListItemIcon style={menuIcon}>
        <Tooltip
          title={userId ? 'Sign Out' : 'Sign In'}
          aria-label="auth">
          {navOption.navMenuIcon}
        </Tooltip>
      </ListItemIcon>
      <Typography variant="subtitle1" style={menuText}>
        {userId ? 'Sign Out' : 'Sign In'}
      </Typography>
    </MenuItem>
  );
};

export default NavItemAuth;
