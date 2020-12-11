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
        <h1 className="text-danger display-4 ">
          Total orders: {orders.length}
        </h1>
      );
    } else {
      <h1 className="text-danger display-2 ">No orders to display</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-1 mr-sm-2">
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

  const showStatus = (order) => {
    let alertStyle = "alert alert-info mb-4";
    switch (order.status) {
      case "Delivered":
        alertStyle = "alert alert-success mb-4";
        break;
      case "Not processed":
        alertStyle = "alert alert-warning mb-4";
        break;
      case "Processing":
        alertStyle = "alert alert-primary mb-4";
        break;
      case "Cancelled":
        alertStyle = "alert alert-danger mb-4";
        break;
      case "Shipped":
        alertStyle = "alert alert-secondary mb-4";
        break;

      default:
        break;
    }
    return (
      <div className="form-group">
        <h3 className={alertStyle}>{order.status}</h3>
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
  };

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
                className="mt-5 m-3"
                key={oindex}
                style={{
                  padding: "20px",
                  border: "1px solid indigo",
                  borderBottom: "1px solid indigo",
                }}
              >
                <h1 className="mb-5 bg-secondary text-light">
                  <span>Order ID:{o._id}</span>
                </h1>
                <ul className="list-group mb-2 m-3">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">
                    Customer Name: {o.user.name}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {o.address}
                  </li>
                  <li className="list-group-item">
                    Ordered {moment(o.createdAt).fromNow()}
                  </li>
                </ul>
                <div className="m-3">
                  <h4 className="mt-4 mb-4">
                    Total items in the order: {o.products.length}
                  </h4>
                  <h5>
                    Order Amount: <t className="text-danger">CDN${o.amount}</t>
                  </h5>
                  {o.products.map((p, pindex) => (
                    <div className="mb-4 flex border" key={pindex}>
                      {showInput("Name", p.name)}
                      {showInput("Price", p.price)}
                      {showInput("Qty", p.count)}
                      {showInput("ID", p._id)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Orders;
