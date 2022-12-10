import React from "react";
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
                      value={profile.accountLocked ? "Unlock" : "Lock"}
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
                    onBlur={props.onProfileBlur}
                  />
                  {profile.errors && profile.errors.firstname && (
                    <div className="alert">{profile.errors.firstname}</div>
                  )}
                  <input
                    className="form-control"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    value={profile.lastname}
                    onChange={onProfileChange}
                    onBlur={props.onProfileBlur}
                  />
                  {profile.errors && profile.errors.lastname && (
                    <div className="alert">{profile.errors.lastname}</div>
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
                    <select
                      className="form-control"
                      name="title"
                      value="Select Role"
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
                      {props.roles &&
                        props.roles.map((r) => (
                          <option key={`role-${r.id}`} value={r.title}>
                            {r.title}
                          </option>
                        ))}
                    </select>

                    <hr />
                  </div>
                )}

                {profile.roles && profile.roles && (
                  <ProfileRoles
                    className="roles"
                    roles={profile.roles}
                    isAdmin={isAdmin}
                    removeRole={props.onRemoveRole}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
