import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import Spinner from '../../components/common/Spinner';
import InputFieldText from '../../components/common/InputFieldText';
import { initForm } from './authFormConfig';
import { createAuthStyles } from './styles';
import { checkForInvalidField } from '../../utilities/utilities';
import { authenticate } from '../../store/actions';

const styles = theme => createAuthStyles(theme);

class Auth extends Component {
  state = {
    userForm: { ...initForm },
    isFormValid: false,
    signUp: false,
    redirectPath: '/'
  };

  componentDidMount() {
    const { origPath } = this.props.location;
    if (origPath === '/orders') {
      this.setState(() => ({
        redirectPath: origPath
      }));
    }
  }

  handleInputValueChange = (inputValue, key, isValid) => {
    const { userForm } = this.state;
    const toBeUpdatedForm = { ...userForm };
    toBeUpdatedForm[key].value = inputValue;
    toBeUpdatedForm[key].isValid = isValid;

    const isFormCurrentlyValid = checkForInvalidField(
      toBeUpdatedForm
    );

    this.setState(() => ({
      userForm: toBeUpdatedForm,
      isFormValid: isFormCurrentlyValid
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userForm, signUp } = this.state;
    const { email, password } = userForm;
    const isSignUp = signUp;
    this.props.authenticate(email.value, password.value, isSignUp);
  };

  toggleButtons = e => {
    e.preventDefault();
    this.setState(prevState => ({
      signUp: !prevState.signUp
    }));
  };

  renderInputField = (key, i, fieldConfig) => {
    const { classes } = this.props;
    return (
      <InputFieldText
        key={i}
        formCtrlStyleClass={classes.formControl}
        id={fieldConfig.id}
        label={fieldConfig.label}
        type={fieldConfig.type}
        labelWidth={fieldConfig.labelWidth}
        validationRules={fieldConfig.validationRules}
        handleInputValueChange={this.handleInputValueChange}
      />
    );
  };

  render() {
    const {
      userForm,
      isFormValid,
      signUp,
      redirectPath
    } = this.state;
    const { classes, error, loading, userId } = this.props;
    const label = signUp ? 'Sign Up' : 'Sgin In';

    let authRedirect = null;
    if (userId) {
      authRedirect = <Redirect to={redirectPath} />;
    }

    if (loading) return <Spinner />;

    return (
      <div className={classes.wrapper}>
        {authRedirect}
        <div className={classes.contents}>
          <div className={classes.info}>
            <InfoTwoToneIcon color="primary" fontSize="large" />
            <Typography
              variant="subtitle1"
              display="inline"
              style={{ color: '#0c80df', marginLeft: '2px' }}>
              For Demo, Sign Up with a fictitious email or Sign In
              with &#39;test1@email.com&#39;, &#39;111111&#39;
            </Typography>
          </div>
          <Typography variant="h6" gutterBottom>
            {label}
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            {Object.keys(userForm).map((key, i) =>
              this.renderInputField(key, i, userForm[key])
            )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isFormValid}>
              {label}
            </Button>
          </form>
          {error ? (
            <Typography variant="subtitle1" className={classes.error}>
              {error.message}
            </Typography>
          ) : null}

          <div className={classes.signUpBtn}>
            <Button
              color="primary"
              variant="text"
              onClick={this.toggleButtons}>
              {!signUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.error,
    loading: auth.loading,
    userId: auth.userId
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { authenticate })
)(Auth);
