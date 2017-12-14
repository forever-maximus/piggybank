import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import './AddItemDialog.css';

const dialogContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const dialogStyle = {
  top: '-30px',
}

class AddItemDialog extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.props.handleSave}
      />,
    ];

    return (
      <Dialog
        title="New Cashflow"
        actions={actions}
        modal={true}
        open={this.props.addItemOpen}
        contentStyle={dialogContainerStyle} 
        style={dialogStyle}
      >
        <div className='form-wrapper'>
          <div className='column-one'>
            <div>
              <TextField name='addItemName' hintText='Name' errorText={this.props.validationErrors.nameError} 
                onChange={this.props.handleChange} floatingLabelText='Name' 
              />
            </div>
            <div>
              <TextField name='addItemAmount' hintText='Amount' errorText={this.props.validationErrors.amountError}
                onChange={this.props.handleChange} floatingLabelText='Amount' 
              />
            </div>
            <div>
              <SelectField value={this.props.addItemType} 
                onChange={this.props.handleDropDown.bind(null,'addItemType')} hintText='Type' 
                floatingLabelText='Type' 
              >
                <MenuItem value={'Expense'} primaryText='Expense' />
                <MenuItem value={'Income'} primaryText='Income' />
              </SelectField>
            </div>
            <div>
              <SelectField value={this.props.addItemCategory} 
                hintText='Category' floatingLabelText='Category' 
                onChange={this.props.handleDropDown.bind(null,'addItemCategory')}
              >
                {this.props.categories.map( (row, index) => (
                  <MenuItem key={index} value={row.name} primaryText={row.name} />
                ))}
              </SelectField>
            </div>
          </div>
          <div className='column-two'>
            <div>
              <SelectField value={this.props.addItemFrequency} 
              onChange={this.props.handleDropDown.bind(null,'addItemFrequency')} hintText='Frequency' 
              floatingLabelText='Frequency' 
              >
                <MenuItem value={'One-Off'} primaryText='One-Off' />
                <MenuItem value={'Weekly'} primaryText='Weekly' />
                <MenuItem value={'Fortnightly'} primaryText='Fortnightly' />
                <MenuItem value={'Monthly'} primaryText='Monthly' />
                <MenuItem value={'Quarterly'} primaryText='Quarterly' />
                <MenuItem value={'Half-Yearly'} primaryText='Half-Yearly' />
                <MenuItem value={'Yearly'} primaryText='Yearly' />
              </SelectField>
            </div>
            <DatePicker hintText="Start Date" floatingLabelText='Start Date' onChange={this.props.handleStartDateChange}/>
            <DatePicker hintText="End Date" floatingLabelText='End Date' onChange={this.props.handleEndDateChange}/>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AddItemDialog;