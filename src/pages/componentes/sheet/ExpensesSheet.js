import React from 'react';
import { connect } from 'react-redux';
import Expense from './Expense';

class ExpensesSheet extends React.Component {
  render() {
    return (
      <Expense />
    );
  }
}

export default connect()(ExpensesSheet);
