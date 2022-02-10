import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import * as Yup from "yup";
import { register } from "../slices/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Not a valid email.")
      .required("Email/username required."),
    password: Yup.string()
      .min(12, "Must be at least 12 characters.")
      .max(60, "Must not exceed 60 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match."
    ),
    firstname: Yup.string()
      .max(32, "Must be max of 32 characters.")
      .required("First name is required."),
    lastname: Yup.string()
      .max(32, "Must be max of 32 characters.")
      .required("Last name is required."),
  });

  const handleRegister = (formValue) => {
    const { username, password, confirmPassword, firstname, lastname } =
      formValue;

    setSuccessful(false);

    dispatch(
      register({ username, password, confirmPassword, firstname, lastname })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div>
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert"
                  />
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="alert"
                  />
                </div>
                <div>
                  <Field
                    name="firstname"
                    type="text"
                    className="form-control"
                    placeholder="Firstname"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="alert"
                  />
                </div>
                <div>
                  <Field
                    name="lastname"
                    type="text"
                    className="form-control"
                    placeholder="Lastname"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="alert"
                  />
                </div>
                <div>
                  <button type="submit" className="btn">
                    Register
                  </button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
      <div>
        {message && (
          <div>
            <div
              className={successful ? "alert success" : "alert"}
              role="alert"
            >
              <div>{message}</div>
              {successful ? (
                <div>
                  <span>
                    Proceed to <a href="/login">Login</a>
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
