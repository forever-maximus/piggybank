import React, { Component } from 'react';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Redirect} from 'react-router-dom';
import {getAuthToken} from '../utils/loginHelpers';

injectTapEventPlugin();


// Not entirely sure how spread operator works - look into later!
const PrivateRoute = ({ component: Component, authToken: token, resetLoginToken: resetMethod, ...rest }) => (
  <Route {...rest} render={(props) => (
    token !== ''
      ? <Component {...props} authToken={token} resetLoginToken={resetMethod} />
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

  resetLoginToken = () => {
    this.setState({loginToken: ''});
  }

  setLoginToken = (token) => {
    this.setState({loginToken: token});
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
      : <div style={styles.containerStyle}>
        <Route path='/login' render={()=><LoginPage setLoginToken={this.setLoginToken}/>} /> 
        <PrivateRoute exact path='/' component={DashboardPage} authToken={this.state.loginToken} 
          resetLoginToken={this.resetLoginToken} />
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    height: '100%',
  },
  // authenticatedStyle: {
  //   marginTop: '56px',
  // },
};

export default App;
