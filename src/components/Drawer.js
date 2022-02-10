import React from "react";
import { NavLink } from "react-router-dom";
import "./Drawer.css";

const menuUsers = (props) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink className="link-nav" to={"/users"}>Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

const Drawer = () => {
  return <div>{menuUsers()}</div>;
};

export default Drawer;
