import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { AddressForm } from "./AddressForm";
import PhoneForm from "./PhoneForm";
import "./Profile.css";
import Roles from "./Roles";

const ProfileForm = ({
  profile,
  scopes,
  onProfileChange,
  addresses,
  onAddressChange,
  phones,
  onPhoneChange,
  onSave,
}) => {
  const isAdmin = scopes.includes("PROFILE_ADMIN");

  return (
    <div>
      {profile && (
        <>
          <form>
            <div>
              <div className="top-column">
                <div className="child-column">
                  <h3>
                    Edit Profile: <strong>{profile.username}</strong>
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
                <div className="child-column profile-form">
                  {addresses.map((a, i) => (
                    <div key={i}>
                      <h3>Edit Address</h3>
                      <AddressForm address={a} onChange={onAddressChange} />
                    </div>
                  ))}
                </div>

                <div className="child-column profile-form">
                  {phones.map((p, i) => (
                    <div key={p.id}>
                      {Number.isInteger(p.id) ? (
                        <h3>Edit Phone {i + 1}:</h3>
                      ) : (
                        <h3>Add Phone</h3>
                      )}
                      <PhoneForm phone={p} onChange={onPhoneChange} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileForm;
