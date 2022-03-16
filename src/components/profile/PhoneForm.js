import React from "react";
import { PHONE_MENU } from ".";

const PhoneForm = ({ phone }) => {
  return (
    <div>
      <input
        className="form-control"
        name="phone"
        type="text"
        value={phone.phone}
      />
      <select
        className="form-control"
        placeholder="Select Phone Type"
        value={phone.type}
      >
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
