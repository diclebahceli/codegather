import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  required: boolean;
}

// Use export default function directly for the component declaration
export default function InputField(props: InputFieldProps) {
  const {type, name, label, required} = props;

  return (
    <div className="form-floating rounded">
      <input
        required={required}
        type={type}
        id={name}
        name={name}
        placeholder={label}
        className="form-control border border-2"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
