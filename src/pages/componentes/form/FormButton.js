import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class FormButton extends React.Component {
  render() {
    const { handleButton, text } = this.props;
    return (

      <button
        type="button"
        onClick={ () => handleButton() }
      >
        {text}
      </button>

    );
  }
}

FormButton.propTypes = {
  handleButton: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default connect()(FormButton);
