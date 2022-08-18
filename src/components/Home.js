import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div>
      <h2>
        Welcome to <strong>des Lauriers</strong> world.
      </h2>
      <p>
        This is where you can find out what we are up to. It includes our photo
        gallery, some art work, and I am adding to it all the time! The site
        itself is a hobby project, sort of. To find out more, checkout the{" "}
        <NavLink to={"/about"}>about</NavLink> page.
      </p>
      {!isLoggedIn && (
        <p>
          For most content, you will need to{" "}
          <NavLink to={"/register"}>create an account</NavLink>. If you already
          have one, <NavLink to={"/login"}> login</NavLink>!
        </p>
      )}
      <p style={{ fontStyle: "italic" }}>
        Designed, deployed, and administered by{" "}
        <strong>Tom des Lauriers</strong>.
      </p>
    </div>
  );
};

export default Home;
