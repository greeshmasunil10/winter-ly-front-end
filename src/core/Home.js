import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySale, setProductsBySale] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySale = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySale(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySale();
  }, []);
  return (
    <Layout
      title="Winter Store"
      description="An eCommerce App"
      className="container-fluid"
    >
      <Search />
      <hr />
      <h2 className="mb-4 ml-4 rainbow-text">Best Sellers</h2>
      <div className="row container-fluid m-4">
        {productsBySale.map((prod, index) => (
          <div key={index} className="col-lg-3 col-sm mb-3">
            <Card product={prod} />
          </div>
        ))}
      </div>
      <hr />
      <h2 className="mb-4 rainbow-text ml-4">New Arrivals</h2>
      <div className="row container-fluid m-4">
        {productsByArrival.map((prod, index) => (
          <div key={index} className="col-lg-3 col-sm mb-3">
            <Card product={prod} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
