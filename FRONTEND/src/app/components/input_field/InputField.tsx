import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
}

// Use export default function directly for the component declaration
export default function InputField(props: InputFieldProps) {
  const { type, name, label, ...rest } = props;

  return (
    <div className="form-floating rounded">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        {...rest} // Spread remaining props
        className="form-control border border-2"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}