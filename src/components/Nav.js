import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = ({ isLoggedIn, logOut }) => {
  return (
    <div>
      <nav className="topnav">
        <div className="childnav">
          <ul className="listnav-1">
            <li className="list-item-nav">
              <NavLink to={"/"} className="link-nav" activeClassName="active">
                des Lauriers
              </NavLink>
            </li>

            <li className="list-item-nav">
              <NavLink
                to={"/home"}
                className="link-nav"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="childnav">
          {isLoggedIn ? (
            <ul className="listnav-2">
              <li className="list-item-nav">
                <NavLink
                  to={"/profile"}
                  className="link-nav"
                  activeClassName="active"
                >
                  Profile
                </NavLink>
              </li>
              <li className="list-item-nav">
                <a
                  href="/login"
                  className="link-nav"
                  activeClassName="active"
                  onClick={logOut}
                >
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="listnav-2">
              <li className="list-item-nav">
                <NavLink
                  to={"/login"}
                  className="link-nav"
                  activeClassName="active"
                >
                  Login
                </NavLink>
              </li>
              <li className="list-item-nav">
                <NavLink
                  to={"/register"}
                  className="link-nav"
                  activeClassName="active"
                >
                  Sign up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
