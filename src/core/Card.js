import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Showimage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  customImage = false,
  customImageSize = 300,
  setRun = (f) => f, // default value of function
  run = undefined,
  detailedCard = false,
  cartCard = false,
  relatedProduct = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const quantityUpdateButton = () => {
    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Qty</span>
          </div>
          <input
            onChange={handleChange(product._id)}
            type="number"
            // className="form-control"
            min="1"
            max={product.quantity}
            value={count}
          />
        </div>
      </div>
    );
  };

  const removeProductButton = () => {
    return (
      <button
        onClick={() => {
          removeItem(product._id);
          setRun(!run);
        }}
        className="btn btn-danger mt-2 mb-2"
      >
        Remove
      </button>
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
      <Fragment>
        {product.quantity ? (
          <button onClick={addToCart} className="btn btn-dark mt-2 mb-2">
            Add to cart
          </button>
        ) : (
          <p className="text-danger">
            Sorry, this item is currently out of stock!
          </p>
        )}
        {product.quantity < 5 && product.quantity > 0 ? (
          <h6 className="text-success mt-3">
            Only {product.quantity} left in stock. Order now!
          </h6>
        ) : (
          ""
        )}
      </Fragment>
    );
  };

  const viewProductButton = () => {
    if (relatedProduct) {
      return (
        <Link to={`${product._id}`}>
          <button className="btn btn-warning mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      );
    } else
      return (
        <Link to={`product/${product._id}`}>
          <button className="btn btn-warning mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-pill badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-pill badge-danger"> Out of Stock</span>
    );
  };

  if (cartCard) {
    console.log("stock:", product.quantity);
    return (
      <div className="card ">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              {doRedirect(redirect)}
              <Showimage
                item={product}
                url="product"
                customImage={customImage}
                customImageSize={customImageSize}
              />
            </div>
            <div className="col-md-8">
              <h6 className="Lead">{product.name}</h6>
              <p className="lead text-danger font-weight-bold">
                CDN${product.price}
              </p>
              {showStock(product.quantity)}
              <br />
              {viewProductButton()}
              {removeProductButton()}
              {quantityUpdateButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (detailedCard) {
    console.log("stock:", product.quantity);
    return (
      <div className="card ">
        <div className="card-header name ">{product.name}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              {doRedirect(redirect)}
              <Showimage
                item={product}
                url="product"
                customImage={customImage}
                customImageSize={customImageSize}
              />
            </div>
            <div className="col-md-4">
              <p className="lead mt-2">
                {product.description.substring(0, 100)}
              </p>
              <p className="lead text-danger font-weight-bold">
                CDN${product.price}
              </p>
              <p className="">
                Category: {product.category && product.category.name}
              </p>
              <p className="text-muted">
                Arrived {moment(product.createdAt).fromNow()}
              </p>
              {showStock(product.quantity)}
              <br />
              <br />
              {addToCartButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body flex-fill">
        {doRedirect(redirect)}
        <Showimage
          item={product}
          url="product"
          customImage={customImage}
          customImageSize={customImageSize}
        />
        <h6 className="">{product.name}</h6>
        {/* <p className=" lead mt-2">
          <small>{product.description.substring(0, 100)}</small>
        </p> */}
        <h6 className="lead">
          <sup>
            <small>CDN$</small>
          </sup>
          {product.price}
        </h6>{" "}
        {viewProductButton()}
        {addToCartButton()}
      </div>
      {/* <div className="card-footer bg-white"></div> */}
    </div>
  );
};

export default Card;
