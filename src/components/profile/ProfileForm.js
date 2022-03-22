import { getRoles } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import PhoneForm from "./PhoneForm";
import "./Profile.css";
import Roles from "./Roles";

const ProfileForm = ({
  profile,
  scopes,
  onProfileChange,
  onAddressChange,
  onPhoneChange,
  onSave,
}) => {
  const isAdmin = scopes.includes("PROFILE_ADMIN");

  const AddPhones = ({ onPhoneChange }) => {
    let addPhones = [];
    if (profile.phones) {
      if (profile.phones.length === 3) {
        return null;
      }
      for (var i = 0; i < 3 - profile.phones.length; i++) {
        addPhones.push(
          <div key={i}>
            <h3>Add Phone:</h3>
            <PhoneForm phone={{}} onChange={onPhoneChange} />
          </div>
        );
      }
    } else {
      for (var j = 0; j < 3; j++) {
        addPhones.push(
          <div key={j}>
            <h3>Add Phone:</h3>
            <PhoneForm phone={{}} onChange={onPhoneChange} />
          </div>
        );
      }
    }
    return addPhones;
  };

  return (
    <div>
      {profile && (
        <>
          <form>
            <div>
              <div className="top-column">
                <div className="child-column">
                  <h3>
                    Profile: <strong>{profile.username}</strong>
                  </h3>
                  <h3>
                    {profile.enabled ? null : (
                      <strong className="alert disabled">
                        Account Disabled
                      </strong>
                    )}
                    {profile.accountLocked ? (
                      <strong className="alert disabled">Account Locked</strong>
                    ) : null}
                    {profile.expired ? (
                      <strong className="alert disabled">
                        Account Expired
                      </strong>
                    ) : null}
                  </h3>
                </div>
                <div className="child-column">
                  <div className="btngroup">
                    {isAdmin ? (
                      <>
                        <input
                          className={
                            profile.enabled
                              ? "btn-profile btn-alert"
                              : "btn-profile button"
                          }
                          name="enabled"
                          type="button"
                          value={profile.enabled ? "Disable" : "Enable"}
                          onClick={onProfileChange}
                        />

                        <input
                          className={
                            profile.accountLocked
                              ? "btn-profile button"
                              : "btn-profile btn-alert"
                          }
                          name="accountLocked"
                          type="button"
                          value={profile.accountLocked ? "UnLock" : "Lock"}
                          onClick={onProfileChange}
                        />
                      </>
                    ) : null}
                    <button className="btn-profile" onClick={onSave}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <hr></hr>

              <div className="profile-form">
                <div className="top-column">
                  <div className="child-column profile-form">
                    <div className="namegroup">
                      <input
                        className="form-control"
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        value={profile.firstname}
                        onChange={onProfileChange}
                      />
                      <input
                        className="form-control"
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                        value={profile.lastname}
                        onChange={onProfileChange}
                      />
                      <div>
                        Member since:{" "}
                        <strong>{`${new Date(
                          profile.dateCreated
                        ).toLocaleDateString()}`}</strong>
                      </div>
                    </div>
                  </div>

                  {profile.roles && (
                    <div className="child-column profile-form">
                      <Roles
                        className="roles"
                        roles={profile.roles}
                        isAdmin={isAdmin}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="top-column">
                {profile.addresses ? (
                  profile.addresses.map((a) => (
                    <div key={a.id} className="child-column profile-form">
                      <h3>Address:</h3>
                      <AddressForm address={a} onChange={onAddressChange} />
                    </div>
                  ))
                ) : (
                  <div className="child-column profile-form">
                    <h3>Add Address:</h3>
                    <AddressForm
                      address={{ id: "temp-1" }}
                      onChange={onAddressChange}
                    />
                  </div>
                )}

                {profile.phones ? (
                  <div className="child-column profile-form">
                    {profile.phones.map((p, i) => (
                      <div key={p.id}>
                        <h3>Phone {i + 1}:</h3>
                        <PhoneForm phone={p} onChange={onPhoneChange} />
                      </div>
                    ))}
                    <AddPhones onPhoneChange={onPhoneChange} />
                  </div>
                ) : (
                  <div className="child-column profile-form">
                    <AddPhones onPhoneChange={onPhoneChange} />
                  </div>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileForm;
