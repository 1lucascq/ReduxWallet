// Coloque aqui suas actions
export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const ADD_WALLET_CURRENCIES = 'ADD_WALLET_CURRENCIES';
export const ADD_WALLET_EXPENSES = 'ADD_WALLET_EXPENSES';
export const ADD_TOTAL_EXPENSES_VALUE = 'ADD_TOTAL_EXPENSES_VALUE';
export const REMOVE_WALLET_EXPENSES = 'REMOVE_WALLET_EXPENSES';
export const EDIT_WALLET_EXPENSE = 'EDIT_WALLET_EXPENSE';
export const ENABLE_EDIT_FORM = 'ENABLE_EDIT_FORM';

export const addUserEmail = (payload) => ({
  type: ADD_USER_EMAIL,
  payload,
});

export const addWalletCurrencies = (payload) => ({
  type: ADD_WALLET_CURRENCIES,
  payload,
});

export const addWalletExpenses = (payload) => ({
  type: ADD_WALLET_EXPENSES,
  payload,
});

export const addTotalExpensesValue = (payload) => ({
  type: ADD_TOTAL_EXPENSES_VALUE,
  payload,
});

export const removeWalletExpenses = (payload) => ({
  type: REMOVE_WALLET_EXPENSES,
  payload,
});

export const enableEditForm = (payload) => ({
  type: ENABLE_EDIT_FORM,
  payload,
});

export const editWalletExpense = (payload) => ({
  type: EDIT_WALLET_EXPENSE,
  payload,
});
