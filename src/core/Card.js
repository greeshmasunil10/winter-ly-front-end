import React from "react";
import { Link } from "react-router-dom";
import Showimage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {
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

  const addToCartButton = () => (
    <button className="btn btn-outline-warning mt-2 mb-2">Add to cart</button>
  );

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-pill badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-pill badge-primary"> Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <Showimage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        {viewProductButton()}
        {addToCartButton()}
      </div>
    </div>
  );
};

export default Card;
