import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Modal from '../components/common/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };

      // registering interceptors - has to happen before children are rendered.
      this.requestInterceptor = axios.interceptors.request.use(
        config => {
          return config;
        },
        error => {
          console.log('REQUEST ERROR');
        }
      );
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          console.log('RESPONSE ERROR');
          this.setState(() => ({
            error
          }));
        }
      );
    }

    componentWillUnmount() {
      // unregister interceptors to prevent memory leaks
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    handleCloseModal = () => {
      this.setState(() => ({
        error: null
      }));
    };

    render() {
      const { error } = this.state;
      return (
        <div>
          <Modal
            open={error !== null}
            handleCloseModal={this.handleCloseModal}
            title="Error"
            closeButtonLabel="Close">
            <Typography>{error ? error.message : null}</Typography>
          </Modal>
          {
            // It is important to pass the original props below
          }
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};
export default withErrorHandler;
