import React from "react";

export default function useSelect(field, fieldValue, handleSelect) {
  const Selector = (props) => (
    <>
      <select
        className="form-control"
        name={field}
        value={fieldValue ? fieldValue : `Select ${field}`}
        onChange={handleSelect}
      >
        <option key={`${field}-0`} value={`Select ${field}`} disabled hidden>
          Select {field}
        </option>
        {props.children}
      </select>
    </>
  );

  return Selector;
}
