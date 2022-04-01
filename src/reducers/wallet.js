import {
  ADD_TOTAL_EXPENSES_VALUE, ADD_WALLET_CURRENCIES,
  ADD_WALLET_EXPENSES, EDIT_WALLET_EXPENSE, ENABLE_EDIT_FORM, REMOVE_WALLET_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpensesValue: 0,
  editExpense: [],
  isEditing: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, action.payload],
    };

  case ADD_WALLET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case ADD_TOTAL_EXPENSES_VALUE:
    return {
      ...state,
      totalExpensesValue: action.payload,
    };

  case REMOVE_WALLET_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== Number(action.payload)),
    };

  case ENABLE_EDIT_FORM:
    return {
      ...state,
      editExpense: action.payload ? state.expenses.filter(
        (exp) => exp.id === Number(action.payload),
      ) : state.editExpense,
      isEditing: true,
    };

  case EDIT_WALLET_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
      isEditing: false,
    };

  default:
    return state;
  }
};

export default walletReducer;
