import React from "react";

export default function Select({ label, value, onChange, options = [] }) {
  return (
    <div className="flex flex-col items-center mt-4 ">
      <label className="mb-2 font-semibold text-primary">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="p-2 rounded-lg border-2 border-primary bg-gray-900 text-white
                   focus:outline-none focus:ring-2 focus:ring-primary-light 
                   hover:border-primary-light transition"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
