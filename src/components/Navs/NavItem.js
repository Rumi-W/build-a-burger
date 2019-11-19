import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

const NavItem = ({ navItemsStyle, navOption }) => {
  let location = useLocation();
  const { menuItem, menuIcon, menuText } = navItemsStyle;
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <MenuItem
      style={menuItem}
      selected={navOption.navLink === currentPath}
      component={NavLink}
      to={navOption.navLink}>
      <ListItemIcon style={menuIcon}>
        <Tooltip
          title={navOption.tooltipText}
          aria-label={navOption.tooltipText}>
          {navOption.navMenuIcon}
        </Tooltip>
      </ListItemIcon>
      <Typography variant="subtitle1" style={menuText}>
        {navOption.navMenuText}
      </Typography>
    </MenuItem>
  );
};

export default NavItem;
