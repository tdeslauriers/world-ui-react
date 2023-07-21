import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAlbums } from "../slices/albums";
import "./Drawer.css";

import galleryService from "../services/galleryService";
import { setMessage } from "../slices/message";

const Drawer = () => {
  const [menuAdminOpen, setMenuAdminOpen] = useState(false);
  const [menuGalleryOpen, setMenuGalleryOpen] = useState(false);
  const [menuAllowanceOpen, setMenuAllowanceOpen] = useState(false);
  const { albums: allAlbums } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { roles: scopes } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // get albums for gallery menu
    if (
      allAlbums.length === 0 &&
      ["GALLERY_READ", "GALLERY_EDIT"].some((s) => scopes.includes(s))
    ) {
      dispatch(getAlbums());
    }
  }, [dispatch, scopes, allAlbums]);

  const handleMenuClick = (menu) => {
    switch (menu) {
      case "admin":
        menuAdminOpen ? setMenuAdminOpen(false) : setMenuAdminOpen(true);
        break;
      case "gallery":
        menuGalleryOpen ? setMenuGalleryOpen(false) : setMenuGalleryOpen(true);
        break;
      case "allowance":
        menuAllowanceOpen
          ? setMenuAllowanceOpen(false)
          : setMenuAllowanceOpen(true);
        break;
      default:
    }
  };

  return (
    isLoggedIn && (
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
              <button onClick={() => handleMenuClick("gallery")}>
                Gallery
              </button>
              {menuGalleryOpen && allAlbums.length && (
                <>
                  {["GALLERY_EDIT"].some((s) => scopes.includes(s)) && (
                    <div className="menu-dropdown">
                      <NavLink className="link-nav" to={"/albums"}>
                        Albums
                      </NavLink>
                      <NavLink className="link-nav" to={"/images/unpublished"}>
                        Unpublished
                      </NavLink>
                    </div>
                  )}
                  <div className="menu-dropdown">
                    {allAlbums.length &&
                      allAlbums.map((a) => (
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
        {scopes &&
          ["ALLOWANCE_ADMIN", "ALLOWANCE_USER"].some((s) =>
            scopes.includes(s)
          ) && (
            <div className="menu">
              <button onClick={() => handleMenuClick("allowance")}>
                Allowance
              </button>
              {menuAllowanceOpen && (
                <div className="menu-dropdown">
                  {["ALLOWANCE_USER"].some((s) => scopes.includes(s)) && (
                    <NavLink className="link-nav" to={"/daily"}>
                      Daily
                    </NavLink>
                  )}
                  {["ALLOWANCE_USER"].some((s) => scopes.includes(s)) && (
                    <NavLink className="link-nav" to={"/dashboard"}>
                      Dashboard
                    </NavLink>
                  )}
                  {["ALLOWANCE_ADMIN"].some((s) => scopes.includes(s)) && (
                    <NavLink className="link-nav" to={"/inspect"}>
                      Inspect
                    </NavLink>
                  )}
                  {["ALLOWANCE_ADMIN"].some((s) => scopes.includes(s)) && (
                    <NavLink className="link-nav" to={"/tasks"}>
                      Tasks
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          )}
      </div>
    )
  );
};

export default Drawer;
