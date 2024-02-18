import React, { Component } from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
}

class InputField extends Component<InputFieldProps> {
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
