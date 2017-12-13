import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts';
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
            <Bar dataKey='amount'>
              {
                this.props.categoriesAggregated.map((entry, index) => (
                  <Cell fill={this.props.categories.find(obj => obj.name === entry.category).colour} key={index} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default ExpenseGraph;