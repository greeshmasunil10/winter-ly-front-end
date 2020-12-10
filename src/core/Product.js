import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProduct(response);
        listRelated(response._id).then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setRelatedProduct(response);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title="Winter Store"
      description="Start Shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card
              product={product}
              showViewProductButton={false}
              customImage={true}
              customImageSize={500}
            />
          )}
        </div>
        <div className="col-4">
          <h4
            className="text-muted"
            // style={{ display: relatedProduct.length > 0 ? "" : "none" }}
          >
            You may also like
          </h4>
          {relatedProduct.map((prod, i) => (
            <div key={i} className="mb-3">
              <Card product={prod} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;