import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getBraintreeClientToken, processPayment } from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({ ...data, clientToken: response.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products
      .reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0)
      .toFixed(2);
  };
  const showCheckoutButton = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  const buy = () => {
    //nonce = data.instance.requestPaymentMethod()
    setData({ ...data, loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((response) => {
        // console.log(response);
        nonce = response.nonce;
        // console.log(
        //   "send nonce and total amt to process:",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setData({ ...data, success: response.success });
            emptyCart(() => {
              console.log("payemnt success and empty cart");
              setData({ ...data, loading: false });
            });
            //empty cart
            //create order
          })
          .catch((error) => {
            console.log("Error", error);
            setData({ ...data, loading: false });
          });
      })
      .catch((error) => {
        console.log("Dropin Error", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: { flow: "vault" },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      You payment has been successfully processed. Thank you for shopping with
      us!
    </div>
  );
  const showLoading = (loading) =>
    loading && <h2 className="text-primary">Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showCheckoutButton()}
    </div>
  );
};

export default Checkout;
