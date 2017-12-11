import React, { Component } from 'react';
import CashflowTable from '../components/CashflowTable';
import './Dashboard.css';
import {formatDate} from '../utils/miscHelpers';
import {getCategoryIdFromName} from '../utils/miscHelpers';
import ExpenseGraph from '../components/ExpenseGraph';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      addItemDialogOpen: false,
      addItemName: '',
      addItemAmount: '',
      addItemFrequency: '',
      addItemType: '',
      addItemCategory: '',
      addItemStartDate: '',
      addItemEndDate: '',
      selectedCashflows: [],
    };
  }

  handleOpen = () => {
    this.setState({addItemDialogOpen: true});
  };

  handleClose = () => {
    this.setState({
      addItemDialogOpen: false, 
      addItemFrequency: '', 
      addItemType: '',
      addItemCategory: '',
    });
  };

  handleSave = () => {
    this.setState({addItemDialogOpen: false, addItemFrequency: '', addItemType: '', addItemCategory: ''});
    const categoryId = getCategoryIdFromName(this.props.categories, this.state.addItemCategory);
    let data = {
      name: this.state.addItemName,
      amount: this.state.addItemAmount,
      frequency: this.state.addItemFrequency,
      cashflow_type: this.state.addItemType,
      category: categoryId,
      start_date: this.state.addItemStartDate,
      end_date: this.state.addItemEndDate,
    };
    this.props.addCashflow(data);
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleDropDown = (name, event, key, value) => {
    this.setState({[name]: value});
  }

  handleStartDateChange = (e, date) => {
    this.setState({addItemStartDate: formatDate(date)});
  };

  handleEndDateChange = (e, date) => {
    this.setState({addItemEndDate: formatDate(date)});
  };

  isSelected = (index) => {
    return this.state.selectedCashflows.indexOf(index) !== -1;
  };

  noneSelected = () => {
    return this.state.selectedCashflows.length === 0;
  }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selectedCashflows: selectedRows,
    });
  };

  onClickDeleteCashflow = () => {
    if (this.state.selectedCashflows.length !== 0) {
      this.props.deleteCashflows(this.state.selectedCashflows)
    }
  };

  render() {
    return (
      <div className='dashboard-wrapper'>
        <div className='cashflows-wrapper'>
          <CashflowTable cashflows={this.props.cashflows} addItemOpen={this.state.addItemDialogOpen} 
            handleOpen={this.handleOpen} handleClose={this.handleClose} handleChange={this.handleChange} 
            addItemFrequency={this.state.addItemFrequency} handleSave={this.handleSave} 
            handleDropDown={this.handleDropDown} handleStartDateChange={this.handleStartDateChange} 
            handleEndDateChange={this.handleEndDateChange} isSelected={this.isSelected} 
            handleRowSelection={this.handleRowSelection} noneSelected={this.noneSelected} 
            onClickDelete={this.onClickDeleteCashflow} addItemType={this.state.addItemType} 
            categories={this.props.categories} addItemCategory={this.state.addItemCategory} 
          />
        </div>
        <div className='metrics-wrapper'>
          <div></div>
          <ExpenseGraph cashflows={this.props.cashflows} categoriesAggregated={this.props.categoriesAggregated} />
        </div>
      </div>
    );
  }
}

export default Dashboard;