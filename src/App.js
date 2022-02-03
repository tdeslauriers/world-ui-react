import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
import AuthVerify from "./common/AuthVerify";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { profile: currentProfile } = useSelector((state) => state.profile);
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
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>

        <AuthVerify logOut={logOut}/>
      </Router>
    </div>
  );
};

export default App;
