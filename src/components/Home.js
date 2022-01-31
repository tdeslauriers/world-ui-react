import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <p>
        Welcome to <strong>des Lauriers</strong> world.
      </p>
      <Link to="/profile">profile</Link>
    </div>
  );
};

export default Home;
