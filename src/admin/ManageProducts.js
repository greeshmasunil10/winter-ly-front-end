import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getProducts().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setProducts(response);
      }
    });
  };

  const { user, token } = isAuthenticated();

  useEffect(() => {
    loadProducts();
  }, []);

  const removeProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} Products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li className="list-group-items d-flex justify-content-between align-items-center">
                <strong>{p.name}</strong>
                <Link to={`/admin/products/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => {
                    removeProduct(p._id);
                  }}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
