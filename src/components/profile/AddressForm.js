import React from "react";

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
      <input
        className="form-control"
        placeholder="State"
        id={address.id}
        name="state"
        value={address.state}
        onChange={onChange}
      />
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
