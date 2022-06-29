import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Drawer.css";

import { getAlbums } from "../slices/albums";

const Drawer = () => {
  const [menuAdminOpen, setMenuAdminOpen] = useState(false);
  const [menuGalleryOpen, setMenuGalleryOpen] = useState(false);

  const { roles: scopes } = useSelector((state) => state.auth.user);
  const { albums: menuAlbums } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // get albums for gallery menu
    if (
      ["GALLERY_READ", "GALLERY_EDIT"].some((s) => scopes.includes(s)) &&
      !menuAlbums.length
    ) {
      dispatch(getAlbums());
    }
  }, [dispatch, scopes, menuAlbums]);

  const handleMenuClick = (menu) => {
    switch (menu) {
      case "admin":
        menuAdminOpen ? setMenuAdminOpen(false) : setMenuAdminOpen(true);
        break;
      case "gallery":
        menuGalleryOpen ? setMenuGalleryOpen(false) : setMenuGalleryOpen(true);
        break;
      default:
    }
  };

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
              <NavLink className="link-nav" to={"/roles"}>
                Roles
              </NavLink>
            </div>
          )}
        </div>
      )}
      {["GALLERY_READ", "GALLERY_EDIT"].some((s) => scopes.includes(s)) && (
        <div className="menu">
          <button onClick={() => handleMenuClick("gallery")}>Gallery</button>
          {menuGalleryOpen && menuAlbums && (
            <div className="menu-dropdown">
              {menuAlbums &&
                menuAlbums.map((a) => (
                  <NavLink
                    key={a.id}
                    to={`/gallery/${a.album}`}
                    className="link-nav"
                  >
                    {a.album}
                  </NavLink>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Drawer;
