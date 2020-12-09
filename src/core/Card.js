import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Showimage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddtoCartButton = true,
  customImage = false,
  customImageSize = 300,
  quantityUpdate = false,
  showRemoveProductButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const viewProductButton = () => {
    return (
      showViewProductButton && (
        <Link to={`product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const quantityUpdateButton = () => {
    return (
      quantityUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust quantity</span>
            </div>
            <input
              onChange={handleChange(product._id)}
              type="number"
              className="form-control"
              value={count}
            />
          </div>
        </div>
      )
    );
  };

  const removeProductButton = () => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const doRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addToCartButton = () => {
    return (
      showAddtoCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-pill badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-pill badge-primary"> Out of Stock</span>
    );
  };

  return (
    <div className="card ">
      <div className="card-header name ">{product.name}</div>
      <div className="card-body">
        {doRedirect(redirect)}
        <Showimage
          item={product}
          url="product"
          customImage={customImage}
          customImageSize={customImageSize}
        />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10 ">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        {viewProductButton()}
        {addToCartButton()}
        {quantityUpdateButton()}
        {removeProductButton()}
      </div>
    </div>
  );
};

export default Card;
