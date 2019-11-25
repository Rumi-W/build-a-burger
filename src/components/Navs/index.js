import React, { useState } from 'react';
//import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { MenuList } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Widgets';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonIcon from '@material-ui/icons/Person';
import NavItem from './NavItem';
import NavItemAuth from './NavItemAuth';
import SideDrawer from './SideDrawer';
import NavBar from './NavBar';
import { navItemsStyle } from './navConfig';

const Navs = ({ userId, children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navOptions = [
    {
      navMenuIcon: <FastfoodIcon fontSize="default" />,
      navMenuText: 'Build New',
      tooltipText: 'Build new order',
      navLink: '/'
    },
    {
      navMenuIcon: <ViewListIcon fontSize="default" />,
      navMenuText: 'Order History',
      tooltipText: 'Order history',
      navLink: '/orders'
    }
  ];

  const navAuthOption = {
    navMenuIcon: <PersonIcon fontSize="default" />,
    navLink: '/auth'
  };

  return (
    <div>
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen}>
        <MenuList style={navItemsStyle.appBar.menuList}>
          {navOptions.map((navOption, index) => (
            <NavItem
              key={`appbar-nav-${index}`}
              navItemsStyle={navItemsStyle.appBar}
              navOption={navOption}
            />
          ))}
          <NavItemAuth
            userId={userId}
            key="appbar-nav-auth"
            navOption={navAuthOption}
            navItemsStyle={navItemsStyle.appBar}
          />
        </MenuList>
      </NavBar>

      <SideDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}>
        <MenuList style={navItemsStyle.sideDrawer.menuList}>
          {navOptions.map((navOption, index) => (
            <NavItem
              key={`side-nav-${index}`}
              navItemsStyle={navItemsStyle.sideDrawer}
              navOption={navOption}
            />
          ))}
          <NavItemAuth
            userId={userId}
            key="appbar-nav-auth"
            navOption={navAuthOption}
            navItemsStyle={navItemsStyle.sideDrawer}
          />
        </MenuList>
      </SideDrawer>
    </div>
  );
};

export default Navs;
