import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

import "./Login.css";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  // Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username required."),
    password: Yup.string().required("Password required."),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        props.history.push("/home");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
              {/* <label htmlFor="username">Username</label> */}
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Username"
              />
              <ErrorMessage name="username" component="div" className="alert" />
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="alert" />
            </div>
            <div>
              <button type="submit" className="btn" disabled={loading}>
                {loading && <span className="spinner"></span>}
                <span className="btn-font">Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {message && (
        <div>
          <div className="alert" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
