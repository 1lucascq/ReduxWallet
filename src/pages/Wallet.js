// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ExpensesSheet from './componentes/sheet/ExpensesSheet';
import ExpensesForm from './componentes/form/ExpensesForm';
import Header from './componentes/Header';
import EditExpensesForm from './componentes/form/EditExpensesForm';

class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <>
        <Header />
        {edit ? <EditExpensesForm /> : <ExpensesForm /> }
        <ExpensesSheet />
      </>

    );
  }
}

Wallet.propTypes = {
  edit: PropTypes.bool,
};

Wallet.defaultProps = {
  edit: false,
};

const mapStateToProps = (state) => ({
  edit: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Wallet);
