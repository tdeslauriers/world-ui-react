import React from "react";
import { PHONE_MENU } from ".";

const PhoneForm = ({ phone, onChange, onBlur }) => {
  return (
    <div>
      <input
        className="form-control"
        type="text"
        id={phone.id}
        name="phone"
        value={phone.phone}
        onChange={onChange}
        onBlur={onBlur}
      />
      {phone.errors && phone.errors.phone && (
        <div className="alert">{phone.errors.phone}</div>
      )}
      <select
        className="form-control"
        id={phone.id}
        name="type"
        value={phone.type ? phone.type : "Select Type"}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="Select Type" disabled hidden>
          Select Type
        </option>
        {PHONE_MENU.map((t, i) => (
          <option key={i} value={t}>
            {t}
          </option>
        ))}
      </select>
      {phone.errors && phone.errors.type && (
        <div className="alert">{phone.errors.type}</div>
      )}
    </div>
  );
};

export default PhoneForm;
