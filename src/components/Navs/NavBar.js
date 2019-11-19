import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Hidden
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  logoDiv: {
    order: 0,
    [theme.breakpoints.down('sm')]: {
      order: 99,
      marginRight: 0,
      marginLeft: 'auto'
    }
  },
  nav: {
    marginRight: '0',
    marginLeft: 'auto'
  },
  pageTitle: {
    margin: 0,
    color: '#fff',
    textTransform: 'none'
  }
}));

const NavBar = ({ open, handleDrawerOpen, children }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}>
          <MenuIcon />
        </IconButton>
        <div className={classes.logoDiv}>
          <Logo />
        </div>
        <Button component={Link} size="small" to="/" variant="text">
          <Typography
            variant="h5"
            noWrap
            className={classes.pageTitle}>
            Build A Burger
          </Typography>
        </Button>
        <Hidden smDown>
          <div className={classes.nav}>{children}</div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
