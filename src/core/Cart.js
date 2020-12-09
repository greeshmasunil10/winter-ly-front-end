import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";
import { getProducts } from "./apiCore";
import { getCart, removeItem } from "./cartHelpers";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = () => {
    return (
      <div>
        <h3>You cart has {`${items.length}`} items</h3>
        <hr />
        {items.map((product, index) => (
          <Card
            product={product}
            showAddtoCartButton={false}
            quantityUpdate={true}
            showRemoveProductButton={true}
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
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
