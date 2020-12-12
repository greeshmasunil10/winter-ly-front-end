import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  //

  const newCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autofocus
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-outline-primary">
          Create Category
        </button>
      </form>
    );
  };
  const showSuccess = () => {
    if (success) {
      return (
        <h3 className="text-success">
          Category '{name}'' is successfully created
        </h3>
      );
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">${error}</h3>;
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Admin Dashboard"
      description={`Hello ${user.name}! Ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2"></div>
        <div className="col-md-8 offset-md-2 offset-2 col-9">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
