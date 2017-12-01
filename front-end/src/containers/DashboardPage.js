import React, { Component } from 'react';
import {get_cashflows, add_cashflow, delete_cashflow} from '../api';
import Dashboard from '../components/Dashboard';
import NavController from './NavController';

class DashboardPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cashflowData: [],
    };
  }

  addCashflow = (data) => {
    add_cashflow(this.props.authToken, data).then(responseData => {
      let cashflows = this.state.cashflowData.slice();
      cashflows.push(responseData);
      this.setState({cashflowData: cashflows});
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  deleteCashflows = (selectedRows) => {
    // Currently only supports deleting 1 element - however setup to delete more with
    // only minor modifications.
    let rowNum = selectedRows.pop();
    delete_cashflow(this.props.authToken, this.state.cashflowData[rowNum].id).then(responseData => {
      let cashflows = this.state.cashflowData.slice();
      cashflows.splice(rowNum, 1);
      this.setState({cashflowData: cashflows});
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  componentDidMount() {
    get_cashflows(this.props.authToken).then(responseData => {
      this.setState({cashflowData: responseData.results});
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  render () {
    return (
      <div>
        <NavController resetLoginToken={this.props.resetLoginToken} />
        <Dashboard cashflows={this.state.cashflowData} addCashflow={this.addCashflow} 
        deleteCashflows={this.deleteCashflows} />
      </div>
    );
  }
}

export default DashboardPage;