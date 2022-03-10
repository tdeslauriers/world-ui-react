import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();

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
        if (location.state?.from) {
          navigate(location.state.from);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    if (location.state?.from) {
      navigate(location.state.from);
    }
    navigate("/home");
  }

  return (
    <div className="form">
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
            {message && (
              <div>
                <div className="alert" role="alert">
                  {message}
                </div>
              </div>
            )}
            <div>
              <button type="submit" className="btn" disabled={loading}>
                {loading && <span className="spinner"></span>}
                <span className="btn-font">Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
