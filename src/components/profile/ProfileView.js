import React from "react";
import { NavLink } from "react-router-dom";
import "./Profile.css";

const ProfileView = ({ profile, scopes }) => {
  const isAdmin = scopes.includes("PROFILE_ADMIN");
  return (
    <div>
      {profile && (
        <>
          <div className="profile-record">
            <div className="contact-top">
              <div className="contact-child">
                <h3>
                  Profile: <strong>{profile.username}</strong>
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
              <div className="contact-child">
                <div className="btngroup">
                  <NavLink to={`/users/edit/${profile.id}`}>
                    <button className="btn-profile">Edit</button>
                  </NavLink>
                  {isAdmin ? (
                    <>
                      <button className="btn-profile">
                        {profile.enabled ? "Disable" : "Enable"}
                      </button>
                      <button className="btn-profile">
                        {profile.locked ? "Unlock" : "Lock"}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <hr></hr>
            <div className="namegroup">
              <div>
                Firstname: <strong>{profile.firstname}</strong>
              </div>
              <div>
                Lastname: <strong>{profile.lastname}</strong>
              </div>
              <div>
                Member since:{" "}
                <strong>{`${new Date(
                  profile.dateCreated
                ).toLocaleDateString()}`}</strong>
              </div>
            </div>
          </div>
          <div className="contact-top">
            {profile.addresses && (
              <div className="profile-record contact-child">
                <h3>Address:</h3>
                <hr></hr>
                {profile.addresses.map((a, i) => (
                  <div key={i}>
                    <div>
                      Street: <strong>{a.address}</strong>
                    </div>
                    <div>
                      City: <strong>{a.city}</strong>
                    </div>
                    <div className="contact-left-col">
                      State: <strong>{a.state}</strong>
                    </div>
                    <div className="contact-right-col">
                      Zip: <strong>{a.zip}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {profile.phones && (
              <div className="profile-record contact-child">
                <h3>Phones:</h3>
                <hr></hr>
                {profile.phones.map((p, i) => (
                  <div key={i}>
                    <div className="contact-left-col">
                      Phone: <strong>{p.phone}</strong>
                    </div>
                    <div className="contact-right-col">
                      Type: <strong>{p.type}</strong>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileView;
