import React from "react";
import { AddressForm } from "./AddressForm";
import PhoneForm from "./PhoneForm";
import "./Profile.css";
import ProfileRoles from "./ProfileRoles";

const ProfileForm = ({
  profile,
  scopes,
  onProfileChange,
  addresses,
  onAddressChange,
  phones,
  onPhoneChange,
  onSave,
  ...props
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
                    Edit profile: <strong>{profile.username}</strong>
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
                    <button
                      className="btn-profile btn-cancel"
                      onClick={props.onCancel}
                    >
                      Cancel
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
                      <ProfileRoles
                        className="roles"
                        roles={props.roles}
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
                      {a.temp ? (
                        <h3>
                          Add address <small>(optional)</small>:
                        </h3>
                      ) : (
                        <h3>Edit address:</h3>
                      )}
                      <AddressForm address={a} onChange={onAddressChange} />
                    </div>
                  ))}
                </div>

                <div className="child-column profile-form">
                  {phones.map((p, i) => (
                    <div key={p.id}>
                      {p.temp ? (
                        <h3>
                          Add Phone <small>(optional)</small>:
                        </h3>
                      ) : (
                        <h3>{`Edit ${p.type.toLowerCase()} phone:`}</h3>
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
