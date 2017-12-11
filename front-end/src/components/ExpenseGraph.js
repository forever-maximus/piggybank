import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './ExpenseGraph.css';


class ExpenseGraph extends Component {
  render() {
    return (
      <div className='graph-container'>
        <h3>Expense Graph</h3>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={this.props.categoriesAggregated}>
            <XAxis dataKey='category'/>
            <YAxis/>
            <CartesianGrid strokeDasharray="4" vertical={false} />
            <Tooltip/>
            <Legend />
            <Bar dataKey='amount' fill="#C53458" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default ExpenseGraph;