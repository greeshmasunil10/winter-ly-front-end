import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url, fullImage }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{
        maxHeight: fullImage ? "750px" : "300px",
        maxWidth: fullImage ? "750px" : "260px",
      }}
    />
  </div>
);

export default ShowImage;
