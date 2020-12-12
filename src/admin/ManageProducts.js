import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";
import Showimage from "../core/ShowImage";

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
      <div className="row ">
        <div className="offset-md-3 col-md-6">
          <table class="table table-bordered table-light">
            <tbody>
              {products.map((p, i) => (
                <tr>
                  <td>
                    <div className="row">
                      <div className="col-6">{p.name}</div>
                      <div className="col-6">
                        <Showimage
                          item={p}
                          url="product"
                          customImage={true}
                          customImageSize={50}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <Link to={`/admin/products/update/${p._id}`}>
                      <button className="btn-xs btn-warning ">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this item?"
                          )
                        )
                          removeProduct(p._id);
                      }}
                      className="btn-xs btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
