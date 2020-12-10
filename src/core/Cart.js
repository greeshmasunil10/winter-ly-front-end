import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";
import { getProducts } from "./apiCore";
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
          <Card
            key={index}
            product={product}
            showAddtoCartButton={false}
            quantityUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty
      <br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
