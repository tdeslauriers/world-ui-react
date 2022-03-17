import { getRoles } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import PhoneForm from "./PhoneForm";
import "./Profile.css";
import Roles from "./Roles";

const ProfileForm = ({ profile, scopes, onProfileChange, onAddressChange }) => {
  const isAdmin = scopes.includes("PROFILE_ADMIN");
  return (
    <div>
      {profile && (
        <>
          {" "}
          <form className="form">
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
                    <button className="btn-profile">Save</button>
                    {isAdmin ? (
                      <>
                        <input
                          className={
                            profile.enabled
                              ? "btn-profile btn-alert"
                              : "btn-profile"
                          }
                          name="enabled"
                          type="button"
                          value={profile.enabled ? "Disable" : "Enable"}
                          onClick={onProfileChange}
                        />
                        <input
                          className={
                            profile.accountLocked
                              ? "btn-profile"
                              : "btn-profile btn-alert"
                          }
                          name="accountLocked"
                          type="button"
                          value={profile.accountLocked ? "UnLock" : "Lock"}
                          onClick={onProfileChange}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <hr></hr>

              <div className="profile-form">
                <div className="top-column">
                  <div className="child-column">
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
                    <div className="child-column">
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
                {profile.addresses &&
                  profile.addresses.map((a) => (
                    <div>
                      <h3>Address:</h3>
                      <AddressForm
                        key={a.id}
                        address={a}
                        onChange={onAddressChange}
                      />
                    </div>
                  ))}
                {profile.phones &&
                  profile.phones.map((p, i) => (
                    <div>
                      <h3>Phone {i + 1}:</h3>
                      <PhoneForm key={p.id} phone={p} />
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileForm;
