import React from "react";

export const AddressForm = ({ address }) => {
  return (
    <div>
      <input
        className="form-control"
        name="address"
        placeholder="Street Address"
        value={address.address}
      />
      <input
        className="form-control"
        name="city"
        placeholder="City"
        value={address.city}
      />
      <input
        className="form-control"
        name="state"
        placeholder="State"
        value={address.state}
      />
      <input
        className="form-control"
        name="zip"
        placeholder="Zip Code"
        value={address.zip}
      />
    </div>
  );
};
