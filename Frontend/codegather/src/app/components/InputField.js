import React, { Component } from 'react';

class InputField extends Component {
  render() {
    const { type, name, label, ...rest } = this.props;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} name={name} {...rest} />
      </div>
    );
  }
}

export default InputField;
