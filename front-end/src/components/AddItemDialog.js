import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const dialogContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

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
      >
        <div><TextField name='addItemName' hintText='Name' onChange={this.props.handleChange}/></div>
        <div><TextField name='addItemAmount' hintText='Amount' onChange={this.props.handleChange}/></div>
        <div>
          <DropDownMenu value={this.props.addItemFrequency} onChange={this.props.handleDropDown}>
            <MenuItem value={'Frequency'} primaryText='Frequency' />
            <MenuItem value={'One-Off'} primaryText='One-Off' />
            <MenuItem value={'Weekly'} primaryText='Weekly' />
            <MenuItem value={'Fortnightly'} primaryText='Fortnightly' />
            <MenuItem value={'Monthly'} primaryText='Monthly' />
            <MenuItem value={'Quarterly'} primaryText='Quarterly' />
            <MenuItem value={'Half-Yearly'} primaryText='Half-Yearly' />
            <MenuItem value={'Yearly'} primaryText='Yearly' />
          </DropDownMenu>
        </div>
        <DatePicker hintText="Start Date" onChange={this.props.handleStartDateChange}/>
        <DatePicker hintText="End Date" onChange={this.props.handleEndDateChange}/>
      </Dialog>
    );
  }
}

export default AddItemDialog;