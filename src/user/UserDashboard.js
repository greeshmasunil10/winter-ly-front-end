import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setHistory(response);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card mb-3">
        <h4 className="card-header">User Links</h4>
        <ul class="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul class="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase History</h3>
      <ul class="list-group">
        <li className="list-group-item">
          {history.map((order, oIndex) => {
            {
              return (
                <div className="flex border m-4">
                  <div className="ml-4">
                    <br />
                    <h4>
                      Order No.<t className="text-primary">{order._id}</t>
                    </h4>
                    <hr />
                    <h5 className="text-info">{order.status}</h5>
                    <hr />
                    {order.products.map((prod, pIndex) => {
                      return (
                        <div key={pIndex}>
                          <p></p>
                          <div className="row">
                            <div className="col-8">
                              <h5 className="text-dark"> {prod.name}</h5>
                              <h6 className="text-muted">
                                Price: CDN${prod.price}
                              </h6>
                            </div>
                            <div className="col-4">
                              <p>Qty:{prod.count}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    Purchased {moment(order.createdAt).fromNow()}
                    <h4 className="mt-2">
                      Order Total:
                      <t className="text-danger"> CDN${order.amount}</t>
                    </h4>
                    <hr />
                  </div>
                </div>
              );
            }
          })}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="User Dashboard"
      description={`Hello ${name}!`}
      className="container"
    >
      <div className="row">
        <div className="col-md-3">{userLinks()}</div>
        <div className="col-md-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
