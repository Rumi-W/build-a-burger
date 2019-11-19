import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

const NavAuth = ({ navItemsStyle, navOptions }) => {
  let location = useLocation();
  const { menuList, menuItem, menuIcon, menuText } = navItemsStyle;
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <MenuItem
      style={menuItem}
      selected={option.navLink === currentPath}
      key={index}
      component={NavLink}
      to={option.navLink}>
      <ListItemIcon style={menuIcon}>
        <Tooltip
          title={option.tooltipText}
          aria-label={option.tooltipText}>
          {option.navMenuIcon}
        </Tooltip>
      </ListItemIcon>
      <Typography variant="subtitle1" style={menuText}>
        {option.navMenuText}
      </Typography>
    </MenuItem>
  );
};

export default NavAuth;
