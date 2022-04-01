import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleInput({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, () => this.enableBtn());
  }

  handleLogin() {
    const { addUser, history } = this.props;
    const { email } = this.state;
    addUser(email);

    history.push('/carteira');
  }

  validateEmail(email) {
    const validFormat = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (email.match(validFormat)) return true;
    return false;
    /*
    Fonte da RegEx de validação de email: https://digitalfortress.tech/js/top-15-commonly-used-regex/
    */
  }

  enableBtn() {
    const MIN_PASSWORD_LENGTH = 6;
    const { email, password } = this.state;
    const emailIsValid = email.length > 1 ? this.validateEmail(email) : false;

    if (password.length >= MIN_PASSWORD_LENGTH && emailIsValid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <main>
        <input
          data-testid="email-input"
          name="email"
          value={ email }
          type="email"
          placeholder="Digite seu email"
          onChange={ (e) => this.handleInput(e) }
        />

        <input
          data-testid="password-input"
          name="password"
          value={ password }
          type="password"
          placeholder="Digite sua senha"
          onChange={ (e) => this.handleInput(e) }

        />

        <button
          type="button"
          onClick={ this.handleLogin }
          disabled={ isDisabled }

        >
          Entrar
        </button>
      </main>

    );
  }
}

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapDispatchToProps = { addUser: addUserEmail };

export default connect(null, mapDispatchToProps)(Login);
