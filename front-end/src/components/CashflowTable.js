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


class CashflowTable extends Component {
  render() {
    return (
      <div className='cashflow-table-wrapper'>
        <h3>Cashflows</h3>
        <Table onRowSelection={this.props.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {this.props.cashflows.map( (row, index) => (
              <TableRow key={index} selected={this.props.isSelected(index)}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.amount}</TableRowColumn>
                <TableRowColumn><i className="fa fa-pencil fa-lg"></i></TableRowColumn>
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
                  handleEndDateChange={this.props.handleEndDateChange} 
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