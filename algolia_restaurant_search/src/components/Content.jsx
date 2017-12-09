import React from "react";
import PropTypes from "prop-types";

import Sidebar from './Sidebar';
import Results from './Results';

const Content = ({ facets, selectedFacets, currentResults }) => (
  <div id="content" className="content">
    <Sidebar
      facets={facets}
      selectedFacets={selectedFacets}
    />
    <Results
      currentResults={currentResults}
    />
  </div>
);

Content.defaultProps = {
  currentResults: {}
};

Content.propTypes = {
  facets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  selectedFacets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool))
    .isRequired,
  currentResults: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool,
    ])
  ),
};

export default Content;
