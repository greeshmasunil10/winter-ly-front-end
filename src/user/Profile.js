import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, email, password, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((response) => {
      if (response.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: response.name,
          email: response.email,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (response) => {
        if (response.error) {
          setValues({ ...values, error: true });
          console.log("error in updatig:", response.error);
        } else {
          updateUser(response, () => {
            setValues({
              ...values,
              name: response.name,
              email: response.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const profileUpdate = (name, email, passworsd) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name: </label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email: </label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password: </label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Update
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="Profile"
      description="Winter Store"
      className="container-fluid"
    >
      <h2 className="mb-4 text-danger display-4">Profile Update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
