import React from "react";
import { STATES_MENU } from ".";

export const AddressForm = ({ address, onChange, onBlur }) => {
  return (
    <div>
      <input
        className="form-control"
        placeholder="Street Address"
        id={address.id}
        name="address"
        value={address.address}
        onChange={onChange}
        onBlur={onBlur}
      />
      {address.errors && address.errors.address && (
        <div className="alert">{address.errors.address}</div>
      )}
      <input
        className="form-control"
        placeholder="City"
        id={address.id}
        name="city"
        value={address.city}
        onChange={onChange}
        onBlur={onBlur}
      />
      {address.errors && address.errors.city && (
        <div className="alert">{address.errors.city}</div>
      )}
      <select
        className="form-control"
        id={address.id}
        name="state"
        value={address.state}
        defaultValue={"Select State"}
        onChange={onChange}
      >
        <option key={0} value="Select State" disabled hidden>
          Select State
        </option>
        {STATES_MENU.map((s, i) => (
          <option key={i + 1} value={s}>
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
        onBlur={onBlur}
      />
      {address.errors && address.errors.zip && (
        <div className="alert">{address.errors.zip}</div>
      )}
    </div>
  );
};
