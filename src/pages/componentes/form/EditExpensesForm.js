import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FormButton from './FormButton';
import Input from './Input';
import SelectInput from './SelectInput';
import {
  addWalletCurrencies, addTotalExpensesValue, editWalletExpense,
} from '../../../actions';

const ALIMENTACAO = 'Alimentação';

class EditExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      paymentOptions: [
        { name: 'Dinheiro', key: 1, value: 'money' },
        { name: 'Cartão de crédito', key: 2, value: 'creditCard' },
        { name: 'Cartão de débito', key: 3, value: 'debitCard' },
      ],
      tagOptions: [
        { name: ALIMENTACAO, key: 1, value: 'food' },
        { name: 'Lazer', key: 2, value: 'leisure' },
        { name: 'Trabalho', key: 3, value: 'work' },
        { name: 'Transporte', key: 4, value: 'transport' },
        { name: 'Saúde', key: 5, value: 'health' },
      ],
      currenciesOptions: [],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }

  componentDidMount() {
    this.updateInputs();
  }

  getTotalValue(expenses, value) {
    const allExpenses = expenses.map((exp) => Number(exp.value));
    allExpenses.push(Number(value));
    const sum = allExpenses.reduce((acc, exp) => acc + exp);
    return sum;
  }

  async getExchangeRates() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  }

  handleInput({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });

    const { currency } = this.state;
    console.log('handleInput - currency', currency);
  }

  async handleButton() {
    const { editExpense, editData } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { state: { wallet: { expenses } } } = this.props;
    const exchangeRates = await this.getExchangeRates();
    const expense = {
      id: editData[0].id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    const updatedExpenses = expenses.map((exp) => {
      if (expense.id === exp.id) {
        return expense;
      }
      return exp;
    });
    editExpense(updatedExpenses);
  }

  updateInputs() {
    const { editData, currenciesOptions } = this.props;
    const { value, description, currency, method, tag } = editData[0];

    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      currenciesOptions,
    });
  }

  render() {
    const { value, description, method, tag, currency,
      paymentOptions, tagOptions, currenciesOptions } = this.state;
    return (
      <form>
        <Input
          name="Valor"
          input="value"
          value={ value }
          handleInput={ this.handleInput }
        />
        <Input
          name="Descrição"
          input="description"
          value={ description }
          handleInput={ this.handleInput }
        />

        <SelectInput
          name="Pagamento"
          input="method"
          value={ method }
          handleInput={ this.handleInput }
          options={ paymentOptions }
        />

        <SelectInput
          name="Moeda"
          input="currency"
          value={ currency }
          handleInput={ this.handleInput }
          options={ currenciesOptions }
        />

        <SelectInput
          name="Tag"
          input="tag"
          value={ tag }
          handleInput={ this.handleInput }
          options={ tagOptions }
        />

        <FormButton
          handleButton={ this.handleButton }
          text="Editar Despesa"
        />
      </form>
    );
  }
}

EditExpensesForm.propTypes = {
  state: PropTypes.objectOf(PropTypes.object).isRequired,
  editData: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpense: PropTypes.func.isRequired,
  currenciesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  editData: state.wallet.editExpense,
  currenciesOptions: state.wallet.currencies,
  state,
});

const mapDispatchToProps = {
  editExpense: editWalletExpense,
  addCurrencies: addWalletCurrencies,
  addTotalExpenses: addTotalExpensesValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesForm);
