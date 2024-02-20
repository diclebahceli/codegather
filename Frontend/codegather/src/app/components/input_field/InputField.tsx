import React, { Component } from "react";

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
}

class InputField extends Component<InputFieldProps> {
  render() {
    const { type, name, label, ...rest } = this.props;

    return (
      <div className="form-floating">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={label}
          {...rest}
          className="form-control"
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

export default InputField;
