import React from "react";
import logo from "./logo.png";
import "./Loading.css";

const Loading = () => {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h2 style={{ textAlign: "center" }}>Loading...</h2>
    </div>
  );
};

export default Loading;
