import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setOrders(response);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setStatusValues(response);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2 ">
          Total orders: {orders.length}
        </h1>
      );
    } else {
      <h1 className="text-danger display-2 ">No orders to display</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then(
      (response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          loadOrders();
        }
      }
    );
  };

  const showStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status:{order.status}</h3>
      <select
        className="form-control"
        onChange={(e) => {
          handleStatusChange(e, order._id);
        }}
      >
        <option>Update Status</option>
        {statusValues.map((status, sIndex) => (
          <option key={sIndex} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`Hello ${user.name}! You can now manage your orders here`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((o, oindex) => {
            return (
              <div
                className="mt-5"
                key={oindex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h1 className="mb-5 bg-secondary text-light">
                  <span>Order ID:{o._id}</span>
                </h1>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">Ordered By: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>
                {o.products.map((p, pindex) => (
                  <div
                    className="mb-4"
                    key={pindex}
                    style={{
                      padding: "20px",
                      border: "1px solid indigo",
                    }}
                  >
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product quantity", p.count)}
                    {showInput("Product ID", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Orders;
