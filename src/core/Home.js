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
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySale.map((prod, index) => (
          <Card key={index} product={prod} />
        ))}
      </div>
      <hr />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((prod, index) => (
          <Card key={index} product={prod} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
