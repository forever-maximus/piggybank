import React, { Component } from 'react';
import {get_cashflows} from '../api';

class DashboardPage extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    get_cashflows(this.props.authToken).then(responseData => {
      console.log(responseData);
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  render () {
    return (
      <div>
        <div>This is the dashboard page.</div>
      </div>
    );
  }
}

export default DashboardPage;