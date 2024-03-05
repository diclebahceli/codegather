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
      <div className="form-floating border-1 border-orange rounded">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={label}
          {...rest}
          className="form-control border border-2"
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

export default InputField;
