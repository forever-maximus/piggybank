import React, { Component } from 'react';
import './CashflowSummary.css';

class CashflowSummary extends Component {
  render () {
    return (
      <div className='summary-container'>
        <h3>Net Position:&nbsp;
          <span className={this.props.netCashflow < 0 ? 'red-text' : 'green-text'}>
            {this.props.netCashflow}
          </span>
        </h3>
      </div>
    )
  }
}

export default CashflowSummary;