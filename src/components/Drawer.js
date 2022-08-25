import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Drawer.css";

import galleryService from "../services/galleryService";
import { setMessage } from "../slices/message";

const Drawer = () => {
  const [menuAdminOpen, setMenuAdminOpen] = useState(false);
  const [menuGalleryOpen, setMenuGalleryOpen] = useState(false);
  const [menuAlbums, setMenuAlbums] = useState([]);

  const { roles: scopes } = useSelector((state) => state.auth.user);
  // const { menus: menuAlbums } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // get albums for gallery menu
    if (
      menuAlbums.length === 0 &&
      ["GALLERY_READ", "GALLERY_EDIT"].some((s) => scopes.includes(s))
    ) {
      galleryService
        .getAlbums()
        .then((response) => {
          setMenuAlbums(response);
        })
        .catch((error) => {
          const message = error.message || error.status;
          dispatch(setMessage(message));
        });
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
      {scopes && scopes.includes("PROFILE_ADMIN") && (
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
      {scopes &&
        ["GALLERY_READ", "GALLERY_EDIT"].some((s) => scopes.includes(s)) && (
          <div className="menu">
            <button onClick={() => handleMenuClick("gallery")}>Gallery</button>
            {menuGalleryOpen && menuAlbums.length && (
              <>
                {["GALLERY_EDIT"].some((s) => scopes.includes(s)) && (
                  <div className="menu-dropdown">
                    <NavLink className="link-nav" to={"/images/unpublished"}>
                      Unpublished
                    </NavLink>
                  </div>
                )}
                <div className="menu-dropdown">
                  {menuAlbums.length &&
                    menuAlbums.map((a) => (
                      <NavLink
                        key={a.id}
                        to={`/albums/${a.album}`}
                        className="link-nav"
                      >
                        {a.album}
                      </NavLink>
                    ))}
                </div>
              </>
            )}
          </div>
        )}
    </div>
  );
};

export default Drawer;
