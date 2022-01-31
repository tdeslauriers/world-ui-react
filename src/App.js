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

const App = () => {
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
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
