import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Wrapper from '../../hoc/Wrapper';
import Navs from '../Navs';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    minHeight: '800px',
    minWidth: '400px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0)
    }
  },
  contentWrapper: {
    padding: theme.spacing(8, 0, 6, 10),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll',
      padding: theme.spacing(6, 0, 0, 0)
    }
  }
}));

const Layout = ({ userId, children }) => {
  // const theme = useTheme();
  // console.log('theme', theme);

  const classes = useStyles();
  return (
    <Wrapper className={classes.root}>
      <CssBaseline />
      <Navs userId={userId} />
      <main className={classes.content}>
        <div className={classes.contentWrapper}>{children}</div>
      </main>
    </Wrapper>
  );
};

export default Layout;
