import React from "react";
import { AddressForm } from "./AddressForm";
import PhoneForm from "./PhoneForm";
import "./Profile.css";
import ProfileRoles from "./ProfileRoles";

const ProfileForm = ({
  profile,
  scopes,
  onProfileChange,
  onAddressChange,
  onPhoneChange,
  onSave,
  ...props
}) => {
  const isAdmin = scopes.includes("PROFILE_ADMIN");
  return (
    <div>
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
                    <strong className="alert disabled">Account Disabled</strong>
                  )}
                  {profile.accountLocked ? (
                    <strong className="alert disabled">Account Locked</strong>
                  ) : null}
                  {profile.expired ? (
                    <strong className="alert disabled">Account Expired</strong>
                  ) : null}
                </h3>
              </div>
              <div className="child-column">
                <div className="btngroup">
                  {isAdmin && (
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
                  )}
                  <button
                    className="btn-profile"
                    type="submit"
                    onClick={onSave}
                    disabled={props.saveDisabled}
                  >
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
                    {props.errors.firstname && (
                      <div className="alert">{props.errors.firstname}</div>
                    )}
                    <input
                      className="form-control"
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                      value={profile.lastname}
                      onChange={onProfileChange}
                    />
                    {props.errors.lastname && (
                      <div className="alert">{props.errors.lastname}</div>
                    )}
                    <div>
                      Member since:{" "}
                      <strong>{`${new Date(
                        profile.dateCreated
                      ).toLocaleDateString()}`}</strong>
                    </div>
                  </div>
                </div>

                <div className="child-column profile-form">
                  {isAdmin && (
                    <div>
                      <div className="top-column">
                        <div className="child-column">
                          <select
                            className="form-control"
                            name="title"
                            value={props.roleSelected.title}
                            onChange={props.onRoleSelect}
                          >
                            <option
                              key={"role-0"}
                              value="Select Role"
                              disabled
                              hidden
                            >
                              Select Role
                            </option>
                            {props.rolesForSelect &&
                              props.rolesForSelect.map((r) => (
                                <option key={`role-${r.id}`} value={r.title}>
                                  {r.title}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="child-column">
                          <div className="btngroup">
                            <button
                              className="btn-profile"
                              onClick={props.onAddRole}
                            >
                              Add Permission
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}

                  {props.roles && (
                    <ProfileRoles
                      className="roles"
                      roles={props.roles}
                      isAdmin={isAdmin}
                      removeRole={props.onRemoveRole}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="top-column">
              <div className="child-column profile-form">
                <hr />
                {profile.addresses &&
                  profile.addresses.map((a, i) => (
                    <div key={i}>
                      {a.removed ? (
                        <div className="top-column">
                          <div className="child-column">
                            <div className="alert success">
                              Address Removed (on Save)
                            </div>
                          </div>
                          <div className="child-column">
                            <div className="btngroup">
                              <button
                                className="btn-profile btn-cancel"
                                id={a.id}
                                name="undoRemove"
                                onClick={onAddressChange}
                              >
                                Undo
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {a.temp ? (
                            <h3>Add address (optional):</h3>
                          ) : (
                            <div className="top-column">
                              <div className="child-column">
                                <h3>Edit address:</h3>
                              </div>
                              <div className="child-column">
                                <div className="btngroup">
                                  <button
                                    className="btn-profile btn-alert"
                                    id={a.id}
                                    name="removeAddress"
                                    onClick={onAddressChange}
                                  >
                                    Remove Address
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <AddressForm address={a} onChange={onAddressChange} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              <div className="child-column profile-form">
                <hr />
                {profile.phones &&
                  profile.phones.map((p, i) => (
                    <div key={p.id}>
                      {p.removed ? (
                        <div className="top-column">
                          <div className="child-column">
                            <div className="alert success">{`${p.type.replace(
                              /\w\S*/g,
                              function (type) {
                                return (
                                  type.charAt(0).toUpperCase() +
                                  type.substr(1).toLowerCase()
                                );
                              }
                            )} Phone Removed (on Save)`}</div>
                          </div>
                          <div className="child-column">
                            <div className="btngroup">
                              <button
                                className="btn-profile btn-cancel"
                                id={p.id}
                                name="undoRemove"
                                onClick={onPhoneChange}
                              >
                                Undo
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {p.temp ? (
                            <h3>Add phone (optional):</h3>
                          ) : (
                            <div className="top-column">
                              <div className="child-column">
                                <h3>{`Edit ${p.type.toLowerCase()} phone`}:</h3>
                              </div>
                              <div className="child-column">
                                <div className="btngroup">
                                  <button
                                    className="btn-profile btn-alert"
                                    id={p.id}
                                    name="removePhone"
                                    onClick={onPhoneChange}
                                  >
                                    Remove Phone
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <PhoneForm phone={p} onChange={onPhoneChange} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default ProfileForm;
