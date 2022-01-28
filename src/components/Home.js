import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Welcome to des Lauriers world.</p>
      <Link to="/profile">profile</Link>
    </div>
  );
};

export default Home;
