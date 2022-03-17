import React from "react";
import { STATES_MENU } from ".";

export const AddressForm = ({ address, onChange }) => {
  return (
    <div>
      <input
        className="form-control"
        placeholder="Street Address"
        id={address.id}
        name="address"
        value={address.address}
        onChange={onChange}
      />
      <input
        className="form-control"
        placeholder="City"
        id={address.id}
        name="city"
        value={address.city}
        onChange={onChange}
      />
      <select
        className="form-control"
        placeholder="Select State"
        id={address.id}
        name="state"
        value={address.state}
        onChange={onChange}
      >
        {STATES_MENU.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        className="form-control"
        placeholder="Zip Code"
        id={address.id}
        name="zip"
        value={address.zip}
        onChange={onChange}
      />
    </div>
  );
};
