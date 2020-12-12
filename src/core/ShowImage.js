import React, { Fragment } from "react";
import { API } from "../config";

const ShowImage = ({ item, url, customImage, customImageSize }) => (
  <Fragment className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3 card-img-top"
      style={{
        // minHeight: customImage ? `100%` : "300px",
        maxWidth: customImage ? `${parseInt(customImageSize)}px` : "260px",
        resizeMode: "contain",
      }}
    />
  </Fragment>
);

export default ShowImage;
