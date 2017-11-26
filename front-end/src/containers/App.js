import React, { Component } from 'react';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Redirect} from 'react-router-dom';
import {getAuthToken} from '../utils/loginHelpers';

injectTapEventPlugin();


// Not entirely sure how spread operator works - look into later!
const PrivateRoute = ({ component: Component, authToken: token, ...rest }) => (
  <Route {...rest} render={(props) => (
    token !== ''
      ? <Component {...props} authToken={token} />
      : <Redirect to='/login' />
  )} />
);


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loginToken: 'unchecked',
    };
  }

  componentDidMount() {
    getAuthToken().then(token => {
      if (typeof token !== 'undefined') {
        this.setState({loginToken: token});
      } else {
        this.setState({loginToken: ''});
      }
    });
  }

  render() {
    return (
      this.state.loginToken === 'unchecked'
      ? <div>Checking</div>
      : <div style={containerStyle}>
        <Route path='/login' component={LoginPage} />
        <PrivateRoute exact path='/' component={DashboardPage} authToken={this.state.loginToken} />
      </div>
    );
  }
}

const containerStyle = {
  height: '100%',
};

export default App;