import React, { Component } from 'react';
import {get_model_data, add_cashflow, delete_cashflow} from '../api';
import Dashboard from '../components/Dashboard';
import NavController from './NavController';
import {getCategoryNameFromId} from '../utils/miscHelpers';

class DashboardPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cashflowData: [],
      categories: [],
      categoriesAggregated: [],
    };
  }

  addCashflow = (data) => {
    add_cashflow(this.props.authToken, data).then(responseData => {
      let cashflows = this.state.cashflowData.slice();
      responseData.category = getCategoryNameFromId(this.state.categories, responseData.category);
      cashflows.push(responseData);
      this.setState({cashflowData: cashflows}, this.calculateCategoryTotals);
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
      this.setState({cashflowData: cashflows}, this.calculateCategoryTotals);
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  getCashflows = () => {
    // This replaces foreign key reference to category table with the actual name.
    // If you want the id of the category later you can match on the name.
    get_model_data(this.props.authToken, 'entries').then(responseData => {
      responseData.filter(row => row.category !== null).map(row => (
        row.category = getCategoryNameFromId(this.state.categories, row.category)
      ));
      this.setState({cashflowData: responseData}, this.calculateCategoryTotals);
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  calculateCategoryTotals = () => {
    let index = 0;
    let totaledCategories = this.state.cashflowData
      .filter(cashflow => cashflow.category !== null && cashflow.cashflow_type === 'Expense')
      .reduce( (accumulated, current) => {
        index = accumulated.findIndex(obj => obj.category === current.category)
        if (index !== -1) {
          accumulated[index].amount += parseFloat(current.amount);
        } else {
          accumulated.push({category: current.category, amount: parseFloat(current.amount)});
        }
        return accumulated;
    } ,[]);
    this.setState({categoriesAggregated: totaledCategories});
  }

  componentDidMount() {
    get_model_data(this.props.authToken, 'categories').then(responseData => {
      this.setState({categories: responseData}, this.getCashflows);
    }).catch(errorData => {
      console.log(errorData);
    });
  }

  render () {
    return (
      <div>
        <NavController resetLoginToken={this.props.resetLoginToken} />
        <Dashboard cashflows={this.state.cashflowData} addCashflow={this.addCashflow} 
          deleteCashflows={this.deleteCashflows} categories={this.state.categories} 
          categoriesAggregated={this.state.categoriesAggregated}  
        />
      </div>
    );
  }
}

export default DashboardPage;