import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";
import { getCart, removeItem } from "./cartHelpers";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = () => {
    return (
      <div>
        <h3>You cart has {`${items.length}`} items</h3>
        <hr />
        {items.map((product, index) => (
          <div className="mb-2">
            <Card
              key={index}
              product={product}
              setRun={setRun}
              run={run}
              cartCard={true}
              customImage={true}
              customImageSize={200}
            />
          </div>
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty
      <br />
      <br />
      <h4 className="ml-5">
        <Link to="/shop" className="text-link">
          Continue
        </Link>{" "}
        shopping
      </h4>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
