import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.getTotalValue = this.getTotalValue.bind(this);
  }

  getTotalValue() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const convertedValues = expenses.map(
        (ex) => Number(ex.value) * ex.exchangeRates[ex.currency].ask,
      );
      const sum = convertedValues.reduce((acc, exp) => acc + exp);
      return sum.toFixed(2);
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{email}</h4>
        <h4 data-testid="total-field">{this.getTotalValue()}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpensesValue,
  state,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
