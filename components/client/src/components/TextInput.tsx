import React from "react";

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={`text-left mb-3 ${className}`}>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default TextInput;
