import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/auth";
import EventBus from "./security/EventBus";
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
import Tasks from "./components/allowance/TaskTypes";
import TaskEdit from "./components/allowance/TaskTypeEdit";
import Daily from "./components/allowance/Daily";
import Inspect from "./components/allowance/Inspect";
import Dashboard from "./components/allowance/Dashboard";
import Albums from "./components/gallery/Albums";
import AlbumEdit from "./components/gallery/AlbumEdit";

const App = () => {
  const [containerClassName, setContainerClassName] = useState("container");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
      setContainerClassName("container"); // temporary
    });

    if (isLoggedIn && currentUser.roles && currentUser.roles.length > 1) {
      setContainerClassName("containerDrawer");
    }
    return () => EventBus.remove("logout");
  }, [currentUser, isLoggedIn, logOut]);

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} logOut={logOut} />
        {isLoggedIn && currentUser.roles && currentUser.roles.length > 1 && (
          <Drawer />
        )}

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
                path=":uuid"
                element={
                  <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                    <User />
                  </Authorized>
                }
              />
              <Route
                exact
                path=":uuid/edit"
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
                index
                element={
                  <Authorized allowedScopes={["GALLERY_READ", "GALLERY_EDIT"]}>
                    <Albums />
                  </Authorized>
                }
              />
              <Route
                exact
                path={":album"}
                element={
                  <Authorized allowedScopes={["GALLERY_READ"]}>
                    <Album />
                  </Authorized>
                }
              />
              <Route
                exact
                path={":albumName/edit"}
                element={
                  <Authorized allowedScopes={["GALLERY_EDIT"]}>
                    <AlbumEdit />
                  </Authorized>
                }
              />
              <Route
                exact
                path={"/albums/add"}
                element={
                  <Authorized allowedScopes={["GALLERY_EDIT"]}>
                    <AlbumEdit />
                  </Authorized>
                }
              />
            </Route>
            <Route exact path="/images">
              <Route
                exact
                path={":filename"}
                element={
                  <Authorized allowedScopes={["GALLERY_READ"]}>
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
            <Route
              exact
              path={"/daily"}
              element={
                <Authorized allowedScopes={["ALLOWANCE_USER"]}>
                  <Daily />
                </Authorized>
              }
            />
            <Route
              exact
              path={"/dashboard"}
              element={
                <Authorized allowedScopes={["ALLOWANCE_USER"]}>
                  <Dashboard />
                </Authorized>
              }
            />
            <Route
              exact
              path={"/inspect"}
              element={
                <Authorized allowedScopes={["ALLOWANCE_ADMIN"]}>
                  <Inspect />
                </Authorized>
              }
            />
            <Route exact path="/tasks">
              <Route
                index
                element={
                  <Authorized allowedScopes={["ALLOWANCE_ADMIN"]}>
                    <Tasks />
                  </Authorized>
                }
              />
              <Route
                exact
                path={":id/edit"}
                element={
                  <Authorized allowedScopes={["ALLOWANCE_ADMIN"]}>
                    <TaskEdit />
                  </Authorized>
                }
              />
              <Route
                exact
                path={"/tasks/add"}
                element={
                  <Authorized allowedScopes={["ALLOWANCE_ADMIN"]}>
                    <TaskEdit />
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
