import React from "react";

function Select({
  label,
  value,
  onChange,
  options,
  className = "",
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={`text-left ${className} mb-3`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
