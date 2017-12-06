import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import './CashflowTable.css';
import AddItemDialog from './AddItemDialog';
import Chip from 'material-ui/Chip';

const greenText = {
  color: '#30E043',
}
const redText = {
  color: '#f7505a',
}

const chipLabelStyle = {
  fontSize: '13px',
}


class CashflowTable extends Component {
  render() {
    return (
      <div className='cashflow-table-wrapper'>
        <h3>Cashflows</h3>
        <Table onRowSelection={this.props.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn className='align-right'>Amount</TableHeaderColumn>
              <TableHeaderColumn className='align-right'>Type</TableHeaderColumn>
              <TableHeaderColumn className='align-right'>Category</TableHeaderColumn>
              <TableHeaderColumn className='align-right'>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {this.props.cashflows.map( (row, index) => (
              <TableRow key={index} selected={this.props.isSelected(index)}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn className='align-right'>{row.amount}</TableRowColumn>
                <TableRowColumn className='align-right' style={row.cashflow_type==='Expense'?redText:greenText}>
                  {row.cashflow_type}
                </TableRowColumn>
                <TableRowColumn>
                  <Chip className='margin-left' labelStyle={chipLabelStyle}>{row.category}</Chip>
                </TableRowColumn>
                <TableRowColumn className='align-right'><i className="fa fa-pencil fa-lg"></i></TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>
                <RaisedButton className='table-button' label='Add' secondary={true} onClick={this.props.handleOpen}/>
                <AddItemDialog addItemOpen={this.props.addItemOpen} handleClose={this.props.handleClose} 
                  handleChange={this.props.handleChange} addItemFrequency={this.props.addItemFrequency} 
                  handleSave={this.props.handleSave} handleDropDown={this.props.handleDropDown} 
                  handleStartDateChange={this.props.handleStartDateChange} 
                  handleEndDateChange={this.props.handleEndDateChange} addItemType={this.props.addItemType} 
                  handleType={this.props.handleType} categories={this.props.categories} 
                  addItemCategory={this.props.addItemCategory} 
                />
                <RaisedButton className='table-button' label='Delete' secondary={true} 
                  disabled={this.props.noneSelected()} onTouchTap={this.props.onClickDelete} 
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default CashflowTable;