import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/auth";
import EventBus from "./security/EventBus";
import AuthVerify from "./security/AuthVerify";
import Gallery from "./components/gallery/Album";
import Authorized from "./security/Authorized";
import Nav from "./components/Nav";
import Users from "./components/profile/Users";
import Drawer from "./components/Drawer";
import UserEdit from "./components/profile/UserEdit";
import User from "./components/profile/User";
import Roles from "./components/profile/roles/Roles";
import RoleEdit from "./components/profile/roles/RoleEdit";
import Error from "./components/Error";
import About from "./components/About";
import Album from "./components/gallery/Album";
import Image from "./components/gallery/Image";
import ImageEdit from "./components/gallery/ImageEdit";
import Unpublished from "./components/gallery/Unpublished";

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
            <Route path="*" element={<Error />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile">
              <Route
                index
                element={
                  <Authorized allowedScopes={["GENERAL_ADMISSION"]}>
                    <User />
                  </Authorized>
                }
              />
              <Route
                exact
                path="edit"
                element={
                  <Authorized allowedScopes={["GENERAL_ADMISSION"]}>
                    <UserEdit />
                  </Authorized>
                }
              />
            </Route>
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
                    <User />
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
            <Route exact path="/albums">
              <Route
                exact
                path={":album"}
                element={
                  <Authorized allowedScopes={["GALLERY_READ", "GALLERY_EDIT"]}>
                    <Album />
                  </Authorized>
                }
              />
            </Route>
            <Route exact path="/images">
              <Route
                exact
                path={":filename"}
                element={
                  <Authorized allowedScopes={["GALLERY_READ", "GALLERY_EDIT"]}>
                    <Image />
                  </Authorized>
                }
              />
              <Route
                exact
                path={":filename/edit"}
                element={
                  <Authorized allowedScopes={["GALLERY_EDIT"]}>
                    <ImageEdit />
                  </Authorized>
                }
              />
              <Route
                exact
                path={"unpublished"}
                element={
                  <Authorized allowedScopes={["GALLERY_EDIT"]}>
                    <Unpublished />
                  </Authorized>
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
