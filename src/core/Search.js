import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [searchFormData, setSearchFormData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    serached: false,
  });

  const { categories, category, results, search, searched } = searchFormData;

  const loadCategories = () => {
    getCategories().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setSearchFormData({ ...searchFormData, categories: response });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (name) => (event) => {
    setSearchFormData({
      ...searchFormData,
      [name]: event.target.value,
      searched: false,
    });
  };

  const searchData = () => {
    console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setSearchFormData({
              ...searchFormData,
              results: response,
              searched: true,
            });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <input
            type="form"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search for products"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  const searchMessage = (search, results) => {
    if (searched && results.length > 0) {
      return `${results.length} products found`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => (
    <div>
      <h3 className="mt-4 mb-4 text-muted">
        {searchMessage(searched, results)}
      </h3>
      <div className="row">
        {results.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container mb-3">{searchedProducts(results)}</div>
    </div>
  );
};
export default Search;
