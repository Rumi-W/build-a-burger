import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { createAuthStyles } from './styles';
import { logOut } from '../../store/actions';

const styles = theme => createAuthStyles(theme);

class SignOut extends Component {
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.contents}>
          <Typography variant="h5">You are signed out.</Typography>

          <div className={classes.signUpBtn}>
            <Button
              component={Link}
              to="/auth"
              color="primary"
              variant="text">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(null, { logOut })
)(SignOut);
