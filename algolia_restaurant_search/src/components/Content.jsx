import React from "react";
import PropTypes from "prop-types";

import Sidebar from './Sidebar';
import Results from './Results';

const Content = () => (
  <div id="content" className="content">
    <Sidebar />
    <Results />
  </div>
);

Content.propTypes = {

};

export default Content;
