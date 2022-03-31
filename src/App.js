import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/auth";
import EventBus from "./security/EventBus";
import AuthVerify from "./security/AuthVerify";
import Gallery from "./components/gallery/Gallery";
import Authorized from "./security/Authorized";
import Nav from "./components/Nav";
import Users from "./components/profile/Users";
import Drawer from "./components/Drawer";
import UserEdit from "./components/profile/UserEdit";
import User from "./components/profile/User";
import Roles from "./components/profile/roles/Roles";
import RoleEdit from "./components/profile/roles/RoleEdit";

const App = () => {
  const [containerClassName, setContainerClassName] = useState("container");

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
      setContainerClassName("container"); // temporary
    });

    if (isLoggedIn) {
      setContainerClassName("containerDrawer");
    }
    return () => EventBus.remove("logout");
  }, [isLoggedIn, logOut]);

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} logOut={logOut} />
        {isLoggedIn && <Drawer />}
        <AuthVerify logOut={logOut} />
        <div className={containerClassName}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/users">
              <Route
                index
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <Users />
                  </Authorized>
                }
              />
              <Route
                exact
                path=":id"
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <User isEditMode={false} />
                  </Authorized>
                }
              />
              <Route
                exact
                path=":id/edit"
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <UserEdit />
                  </Authorized>
                }
              />
            </Route>
            <Route exact path="/roles">
              <Route
                index
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <Roles />
                  </Authorized>
                }
              />
              <Route
                exact
                path={":id/edit"}
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <RoleEdit />
                  </Authorized>
                }
              />
              <Route
                exact
                path={"/roles/add"}
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <RoleEdit />
                  </Authorized>
                }
              />
            </Route>
            <Route
              exact
              path="/gallery"
              element={
                <Authorized allowedScopes={["GALLERY_READ"]}>
                  <Gallery />
                </Authorized>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
