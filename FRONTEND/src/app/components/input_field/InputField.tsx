import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  required: boolean;
  value?: string;
}

// Use export default function directly for the component declaration
export default function InputField(props: InputFieldProps) {
  const { type, name, label, required, value } = props;

  return (
    <div className="form-floating rounded">
      <input
        required={required}
        type={type}
        id={name}
        name={name}
        placeholder={label}
        value={value}
        className="form-control border border-3 border-green"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
