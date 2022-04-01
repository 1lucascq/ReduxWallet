import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  addTotalExpensesValue, enableEditForm, removeWalletExpenses,
} from '../../../actions';

class ExpenseData extends React.Component {
  getConvertedValue(value, ask) {
    return (Number(value) * ask).toFixed(2);
  }

  deleteBtn(id) {
    const { removeExpenses } = this.props;
    removeExpenses(id);
  }

  ediBtn(id) {
    const { enableEdit } = this.props;
    enableEdit(id);
  }

  render() {
    const { expenses } = this.props;

    return (
      <tbody>
        {expenses.length > 0 && (expenses.map((expense) => {
          const { value, description, tag, method, currency, exchangeRates } = expense;
          const { name } = exchangeRates[currency];
          return (
            <tr key={ expense.id }>
              <td>{value}</td>
              <td>{this.getConvertedValue(value, exchangeRates[currency].ask)}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{method}</td>
              <td>{tag}</td>
              <td>{description}</td>
              <td>{name}</td>
              <td>Real</td>
              <td>

                <button
                  type="button"
                  id={ expense.id }
                  data-testid="edit-btn"
                  onClick={ ({ target: { id } }) => this.ediBtn(id) }
                >
                  Editar

                </button>
                <button
                  type="button"
                  id={ expense.id }
                  data-testid="delete-btn"
                  onClick={ ({ target: { id } }) => this.deleteBtn(id) }
                >
                  Excluir
                </button>

              </td>
            </tr>
          );
        }))}

      </tbody>
    );
  }
}

ExpenseData.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
  enableEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  removeExpenses: removeWalletExpenses,
  addTotalExpenses: addTotalExpensesValue,
  enableEdit: enableEditForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseData);
