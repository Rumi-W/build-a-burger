import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OrderContainer from './containers/OrderContainer';
import Cart from './containers/Cart';
import OrderHistory from './containers/OrderHistory';
import Auth from './containers/Auth';
import SignOut from './containers/Auth/SignOut';
import PrivateRoute from './components/Route/PrivateRoute';
import { checkAuthStatus } from './store/actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.checkAuthStatus();
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <Layout userId={this.props.userId}>
          <Switch>
            <PrivateRoute
              component={OrderHistory}
              path="/orders"
              userId={this.props.userId}
              exact
            />
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/signout">
              <SignOut />
            </Route>
            <Route path="/" exact>
              <OrderContainer />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { userId: auth.userId };
};

export default connect(mapStateToProps, { checkAuthStatus })(App);
