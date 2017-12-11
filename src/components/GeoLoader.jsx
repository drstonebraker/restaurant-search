/* eslint-disable global-require */

import React from "react";

const GeoLoader = () => (
  <div className="geo-loader">
    <img
      alt="A spinning location icon"
      src={require("../resources/graphics/488.gif")}
    />
    <span>  Waiting for location...</span>
  </div>
);

export default GeoLoader;
