import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Profile.css";
import Roles from "./Roles";

const ProfileView = ({ profile, scopes }) => {
  const location = useLocation();
  const isAdmin = scopes.includes("PROFILE_ADMIN");

  const formatPhone = (phone) => {
    let areacode = phone.slice(0, 3);
    let exchange = phone.slice(3, 6);
    let lineNumber = phone.slice(6);
    return `( ${areacode} ) ${exchange} - ${lineNumber}`;
  };

  return (
    <div>
      {profile && (
        <>
          <div className="top-column">
            <div className="child-column">
              <h3>
                <h3>
                  Profile: <strong>{profile.username}</strong>
                </h3>
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
                <NavLink
                  to={`/users/${profile.id}/edit`}
                  replace
                  state={{ from: location }}
                >
                  <button className="btn-profile">Edit</button>
                </NavLink>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="top-column">
            <div className="child-column profile-record">
              <h3>Member: </h3>
              <hr />
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

            {profile.roles && (
              <div className="child-column roles">
                <Roles roles={profile.roles} isAdmin={isAdmin} />
              </div>
            )}
          </div>

          <div className="top-column">
            {profile.addresses ? (
              <div className="child-column profile-record">
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
                    <div>
                      State: <strong>{a.state}</strong>
                    </div>
                    <div>
                      Zip: <strong>{a.zip}</strong>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="child-column profile-record">
                <h3>No Address Listed.</h3>
                <hr />
              </div>
            )}

            {profile.phones ? (
              <div className="child-column profile-record">
                <h3>Phones:</h3>
                <hr></hr>
                {profile.phones.map((p, i) => (
                  <div key={i}>
                    <div className="contact-left-col">
                      Phone: <strong>{formatPhone(p.phone)}</strong>
                    </div>
                    <div className="contact-right-col">
                      Type: <strong>{p.type}</strong>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            ) : (
              <div className="child-column profile-record">
                <h3>No Phones Listed.</h3>
                <hr />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileView;
