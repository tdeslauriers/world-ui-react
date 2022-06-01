import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>
        Welcome to <strong>des Lauriers</strong> world.
      </h2>
      <p>
        This is where you can find out what we are up to. It includes our photo
        gallery, some art work, and I am adding to it all the time! For most
        content, you will need to{" "}
        <NavLink to={"/register"}>create an account</NavLink>. If you already
        have one, <NavLink to={"/login"}> login</NavLink>!
      </p>
      <p>
        The site itself is a hobby project, sort of. To find out more, checkout
        the <NavLink to={"/about"}>about</NavLink> page.
      </p>
    </div>
  );
};

export default Home;
