import React, { Component } from 'react';
import CashflowTable from '../components/CashflowTable';
import './Dashboard.css';
import {formatDate} from '../utils/miscHelpers';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      addItemDialogOpen: false,
      addItemName: '',
      addItemAmount: '',
      addItemFrequency: '',
      addItemType: '',
      addItemStartDate: '',
      addItemEndDate: '',
      selectedCashflows: [],
    };
  }

  handleOpen = () => {
    this.setState({addItemDialogOpen: true});
  };

  handleClose = () => {
    this.setState({addItemDialogOpen: false, addItemFrequency: '', addItemType: ''});
  };

  handleSave = () => {
    this.setState({addItemDialogOpen: false});
    let data = {
      name: this.state.addItemName,
      amount: this.state.addItemAmount,
      frequency: this.state.addItemFrequency,
      cashflow_type: this.state.addItemType,
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
        <CashflowTable cashflows={this.props.cashflows} addItemOpen={this.state.addItemDialogOpen} 
          handleOpen={this.handleOpen} handleClose={this.handleClose} handleChange={this.handleChange} 
          addItemFrequency={this.state.addItemFrequency} handleSave={this.handleSave} 
          handleDropDown={this.handleDropDown} handleStartDateChange={this.handleStartDateChange} 
          handleEndDateChange={this.handleEndDateChange} isSelected={this.isSelected} 
          handleRowSelection={this.handleRowSelection} noneSelected={this.noneSelected} 
          onClickDelete={this.onClickDeleteCashflow} addItemType={this.state.addItemType} 
        />
      </div>
    );
  }
}

export default Dashboard;