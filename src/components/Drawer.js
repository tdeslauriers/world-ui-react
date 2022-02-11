import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Drawer.css";

const Drawer = () => {
  const [menuAdminOpen, setMenuAdminOpen] = useState(false);
  const [menuGalleryOpen, setMenuGalleryOpen] = useState(false);

  const { roles: scopes } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleMenuClick =(menu) => {
    switch (menu) {
      case "admin":
        menuAdminOpen ? setMenuAdminOpen(false) : setMenuAdminOpen(true);
        break;
      case "gallery":
        menuGalleryOpen ? setMenuGalleryOpen(false) : setMenuGalleryOpen(true);
        break;
      default:
    }
  }
  console.log(scopes)

  return (
    <div className="sidebar">
      {scopes.includes("PROFILE_ADMIN") && (
        <div className="menu">
          <button onClick={() => handleMenuClick("admin")}>Admin</button>
          {menuAdminOpen && (
            <div className="menu-dropdown">
              <NavLink className="link-nav" to={"/users"}>
                Users
              </NavLink>
            </div>
          )}
        </div>
      )}
      {["GALLERY_READ", "GALLERY_EDIT"].some(s => scopes.includes(s)) && (
        <div className="menu">
          <button onClick={() => handleMenuClick("gallery")}>Gallery</button>
          {menuGalleryOpen && <div className="menu-dropdown">Placeholder</div>}
        </div>
      )}
    </div>
  );
};

export default Drawer;
