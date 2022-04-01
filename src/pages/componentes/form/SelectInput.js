import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {
  render() {
    const { name, value, handleInput, input, options } = this.props;
    return (

      <label htmlFor={ input }>
        {name}
        :
        <select
          type="text"
          name={ input }
          id={ input }
          value={ value }
          onChange={ (e) => handleInput(e) }
          data-testid={ `${input}-input` }
        >
          {options.map((item) => (
            <option
              key={ item.key }
              value={ item.name }
              data-testid={ value }
            >
              {item.name}

            </option>
          ))}
        </select>
      </label>

    );
  }
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect()(Input);
