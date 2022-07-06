import React, { useEffect } from "react";
import { Buffer } from "buffer";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return Buffer.from(token.split(".")[1], "base64").toString();
  } catch (error) {
    return null;
  }
};

const AuthVerify = (props) => {
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decoded = JSON.parse(parseJwt(user.access_token));
      if (decoded.exp * 1000 < Date.now()) {
        props.logOut();
      }     
    }
  }, [location, props]);

  return <div></div>;
};

export default AuthVerify;
