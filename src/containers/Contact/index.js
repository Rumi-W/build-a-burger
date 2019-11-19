import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import InputFieldText from '../../components/common/InputFieldText';
import InputFieldNumber from '../../components/common/InputFieldNumber';
import { checkForInvalidField } from '../../utilities/utilities';
import { createContactStyles } from './styles';
import { initForm } from './contactFormConfig';
import { submitOrder, resetOrder } from '../../store/actions';

const Styles = theme => createContactStyles(theme);

class Contact extends Component {
  state = {
    customer: { ...initForm },
    modalOpen: false,
    isFormValid: false,
    orderDateTime: moment(new Date()).toISOString()
  };

  handleOrder = e => {
    const { order, totalPrice, userId, idToken } = this.props;
    const { customer, orderDateTime } = this.state;
    e.preventDefault();
    e.stopPropagation();

    const customerInfo = Object.keys(customer).reduce(
      (total, current) => {
        return { ...total, [current]: customer[current].value };
      },
      {}
    );

    const customerOrder = {
      userId,
      order,
      orderDateTime,
      totalPrice,
      customer: customerInfo
    };

    this.props.submitOrder(customerOrder, idToken).then(() => {
      this.setState(() => ({
        modalOpen: true
      }));
    });
  };

  handleInputValueChange = (inputValue, key, isValid) => {
    const { customer } = this.state;

    const toBeUpdatedCustomer = { ...customer };
    toBeUpdatedCustomer[key].value = inputValue;
    toBeUpdatedCustomer[key].isValid = isValid;

    const isFormCurrentlyValid = checkForInvalidField(
      toBeUpdatedCustomer
    );

    this.setState(() => ({
      customer: toBeUpdatedCustomer,
      isFormValid: isFormCurrentlyValid
    }));
  };

  handleCloseModal = () => {
    this.setState(
      () => ({
        modalOpen: false
      }),
      () => {
        this.props.resetOrder();
        this.props.history.push('/');
      }
    );
  };

  renderInputField = (key, i, fieldConfig) => {
    const { classes } = this.props;
    if (fieldConfig.inputFieldType === 'text') {
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
    }
    if (fieldConfig.inputFieldType === 'number') {
      return (
        <InputFieldNumber
          key={i}
          id={fieldConfig.id}
          label={fieldConfig.label}
          type={fieldConfig.type}
          labelWidth={fieldConfig.labelWidth}
          numFormat={fieldConfig.numFormat}
          numMask={fieldConfig.numMask}
          validationRules={fieldConfig.validationRules}
          handleInputValueChange={this.handleInputValueChange}
        />
      );
    }
  };

  render() {
    const { classes, loading, success } = this.props;
    const { customer, modalOpen, isFormValid } = this.state;

    let modalContents = null;
    let modalTitle = 'Undecided';
    if (loading) {
      modalTitle = 'Please wait...';
      modalContents = <Spinner />;
    } else if (success) {
      modalTitle = 'Success';
      modalContents = (
        <Typography align="center">
          Going to Payment Info Page...
        </Typography>
      );
    } else if (!success) {
      modalTitle = 'Error';
      modalContents = (
        <Typography align="center">
          Please call customer care.
        </Typography>
      );
    }

    return (
      <div className={classes.contents}>
        <Typography variant="h6" gutterBottom>
          Enter your contact information
        </Typography>
        <form className={classes.form}>
          {Object.keys(customer).map((key, i) =>
            this.renderInputField(key, i, customer[key])
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isFormValid}
            onClick={this.handleOrder}>
            Continue
          </Button>
        </form>

        <Modal
          title={modalTitle}
          open={modalOpen}
          handleCloseModal={this.handleCloseModal}
          closeButtonLabel="Close">
          {modalContents}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { userId: auth.userId, idToken: auth.idToken };
};

export default compose(
  withRouter,
  withStyles(Styles),
  connect(mapStateToProps, { submitOrder, resetOrder })
)(Contact);
