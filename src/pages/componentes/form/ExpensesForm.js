import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FormButton from './FormButton';
import Input from './Input';
import SelectInput from './SelectInput';
import {
  addWalletExpenses, addWalletCurrencies, addTotalExpensesValue,
} from '../../../actions';

const ALIMENTACAO = 'Alimentação';

class ExpensesForm extends React.Component {
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
    this.handleExpensesButton = this.handleExpensesButton.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getTotalValue(expenses, value) {
    const allExpenses = expenses.map((exp) => Number(exp.value));
    allExpenses.push(Number(value));
    const sum = allExpenses.reduce((acc, exp) => acc + exp);
    return sum;
  }

  async getCurrencies() {
    const { addCurrencies } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const filteredData = Object.entries(data).map((cur, i) => (
      { name: cur[0], key: i, value: cur[0] }
    ));
    const currenciesOptions = filteredData.filter((e) => e.name !== 'USDT');

    this.setState({ currenciesOptions });
    addCurrencies(currenciesOptions);
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
  }

  async handleExpensesButton() {
    const { addExpenses, addTotalExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { state: { wallet: { expenses } } } = this.props;
    const exchangeRates = await this.getExchangeRates();
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addExpenses(expense);

    const totalExpenses = this.getTotalValue(expenses, expense.value);
    addTotalExpenses(totalExpenses);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
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
          handleButton={ this.handleExpensesButton }
          text="Adicionar despesa"
        />

      </form>
    );
  }
}

ExpensesForm.propTypes = {
  state: PropTypes.objectOf(PropTypes.object).isRequired,
  addCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  addTotalExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  state,
});

const mapDispatchToProps = {
  addExpenses: addWalletExpenses,
  addCurrencies: addWalletCurrencies,
  addTotalExpenses: addTotalExpensesValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
