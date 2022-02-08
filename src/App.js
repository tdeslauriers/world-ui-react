import React, { useCallback, useEffect } from "react";
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
import ProfilesAll from "./components/profile/ProfilesAll";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => EventBus.remove("logout");
  }, [isLoggedIn, logOut]);

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} logOut={logOut} />
        <AuthVerify logOut={logOut} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route
            exact
            path="/users"
            element={
              <Authorized allowedScopes={["PROFILE_ADMIN"]}>
                <ProfilesAll />
              </Authorized>
            }
          />
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
      </Router>
    </div>
  );
};

export default App;
