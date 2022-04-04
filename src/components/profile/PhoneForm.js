import React from "react";
import { PHONE_MENU } from ".";

const PhoneForm = ({ phone, onChange }) => {
  return (
    <div>
      <input
        className="form-control"
        type="text"
        id={phone.id}
        name="phone"
        value={phone.phone}
        onChange={onChange}
      />
      <select
        className="form-control"
        id={phone.id}
        name="type"
        value={phone.type}
        defaultValue="Select Type"
        onChange={onChange}
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
    </div>
  );
};

export default PhoneForm;
