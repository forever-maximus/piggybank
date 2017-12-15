import React, { Component } from 'react';
import CashflowTable from '../components/CashflowTable';
import './Dashboard.css';
import {formatDate} from '../utils/miscHelpers';
import {getCategoryIdFromName} from '../utils/miscHelpers';
import ExpenseGraph from '../components/ExpenseGraph';
import CashflowSummary from '../components/CashflowSummary';

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
      validationErrors: {
        nameError: '',
        amountError: '',
        typeError: '',
        categoryError: '',
        frequencyError: '',
        startDateError: '',
      },
    };
  }

  handleOpen = () => {
    this.setState({addItemDialogOpen: true});
  };

  handleClose = () => {
    this.clearDialogStateFields();
  };

  clearDialogStateFields = () => {
    this.setState({
      addItemDialogOpen: false, 
      addItemFrequency: '', 
      addItemType: '', 
      addItemCategory: '',
      addItemName: '',
      addItemAmount: '',
      addItemEndDate: '',
      addItemStartDate: '',
      validationErrors: {
        nameError: '',
        amountError: '',
        typeError: '',
        categoryError: '',
        frequencyError: '',
        startDateError: '',
      },
    });
  }

  // Check empty inputs on required fields and type mismatches
  validateInputs = () => {
    let nameValidation = '', amountValidation = '', typeValidation = '', categoryValidation = '', 
      frequencyValidation = '', startDateValidation = '';
    if (this.state.addItemName === '') {
      nameValidation = 'Name required';
    }
    if (this.state.addItemAmount === '') {
      amountValidation = 'Amount required';
    }
    if (isNaN(parseFloat(this.state.addItemAmount)) && amountValidation === '') {
      amountValidation = 'Must be a number';
    }
    if (this.state.addItemType === '') {
      typeValidation = 'Cashflow type required'
    }
    if (this.state.addItemCategory === '') {
      categoryValidation = 'Category is required'
    }
    if (this.state.addItemFrequency === '') {
      frequencyValidation = 'Frequency is required'
    }
    if (this.state.addItemStartDate === '') {
      startDateValidation = 'Start date is required'
    }
    if (nameValidation !== '' || amountValidation !== '' || typeValidation !== '' || categoryValidation !== '' ||
        frequencyValidation !== '' || startDateValidation !== '') {
      this.setState({validationErrors: {
        nameError: nameValidation, 
        amountError: amountValidation,
        typeError: typeValidation,
        categoryError: categoryValidation,
        frequencyError: frequencyValidation,
        startDateError: startDateValidation,
      }})
      return false;
    }
    return true;
  };

  handleSave = () => {
    if (this.validateInputs()) {
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
      this.clearDialogStateFields();
    }
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    if (e.target.name === 'addItemName' && this.state.validationErrors.nameError !== '') {
      this.setState({validationErrors: {...this.state.validationErrors, nameError: ''}});
    }
    if (e.target.name === 'addItemAmount' && this.state.validationErrors.amountError !== '') {
      this.setState({validationErrors: {...this.state.validationErrors, amountError: ''}});
    }
  };

  handleDropDown = (name, event, key, value) => {
    this.setState({[name]: value});
    if (name === 'addItemType' && this.state.validationErrors.typeError !== '') {
      this.setState({validationErrors: {...this.state.validationErrors, typeError: ''}});
    }
    else if (name === 'addItemCategory' && this.state.validationErrors.categoryError !== '') {
      this.setState({validationErrors: {...this.state.validationErrors, categoryError: ''}});
    }
    else if (name === 'addItemFrequency' && this.state.validationErrors.frequencyError !== '') {
      this.setState({validationErrors: {...this.state.validationErrors, frequencyError: ''}});
    }
  }

  handleStartDateChange = (e, date) => {
    this.setState({addItemStartDate: formatDate(date)});
    if (this.state.validationErrors.startDateError !== '') {
      this.setState({validationErrors: {...this.state.validationErrors, startDateError: ''}});
    }
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
            validationErrors={this.state.validationErrors} 
          />
        </div>
        <div className='metrics-wrapper'>
          <CashflowSummary netCashflow={this.props.netCashflow} />
          <ExpenseGraph cashflows={this.props.cashflows} categoriesAggregated={this.props.categoriesAggregated}
            categories={this.props.categories}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;