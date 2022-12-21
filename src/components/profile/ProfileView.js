import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Profile.css";
import ProfileRoles from "./ProfileRoles";

const ProfileView = ({ profile }) => {
  const location = useLocation();

  const editRoute =
    location.pathname === "/profile"
      ? "/profile/edit"
      : `/users/${profile.uuid}/edit`;

  const formatPhone = (phone) => {
    let areacode = phone.slice(0, 3);
    let exchange = phone.slice(3, 6);
    let lineNumber = phone.slice(6);
    return `( ${areacode} ) ${exchange} - ${lineNumber}`;
  };

  return (
    <div>
      <>
        <div className="top-column">
          <div className="child-column">
            <h3>
              Profile: <strong>{profile.username}</strong>
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
              <NavLink to={editRoute} replace state={{ from: location }}>
                <button className="btn-profile">Edit</button>
              </NavLink>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="top-column">
          <div className="child-column profile-record">
            <h3>Registered as: </h3>
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
              <ProfileRoles roles={profile.roles} isAdmin={false} />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default ProfileView;
