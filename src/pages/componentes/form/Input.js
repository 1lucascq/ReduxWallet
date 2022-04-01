import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {
  render() {
    const { name, value, handleInput, input } = this.props;
    return (
      <label htmlFor={ input }>
        {name}
        :
        <input
          type="text"
          name={ input }
          id={ input }
          value={ value }
          onChange={ (e) => handleInput(e) }
          data-testid={ `${input}-input` }
        />
      </label>
    );
  }
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default connect()(Input);
