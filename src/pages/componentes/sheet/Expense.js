import React from 'react';
import { connect } from 'react-redux';
import ExpenseData from './ExpenseData';

class Expenses extends React.Component {
  getConvertedValue(value, ask) {
    return (Number(value) * ask).toFixed(2);
  }

  render() {
    return (

      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Valor convertido</th>
            <th>Câmbio utilizado</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <ExpenseData />

      </table>
    );
  }
}

export default connect()(Expenses);
