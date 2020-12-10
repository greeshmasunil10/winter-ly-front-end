import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url, customImage, customImageSize }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{
        maxHeight: customImage ? `${parseInt(customImageSize)}px` : "300px",
        maxWidth: customImage ? `${parseInt(customImageSize)}px` : "260px",
      }}
    />
  </div>
);

export default ShowImage;