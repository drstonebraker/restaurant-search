import React from "react";
import PropTypes from "prop-types";

import Sidebar from './Sidebar';
import Results from './Results';

const Content = ({
  isExpanded, selectedFacets, currentResults, handleFilterClick, handleExpand
}) => (
  <div id="content" className="content">
    <Sidebar
      facets={currentResults.facets}
      selectedFacets={selectedFacets}
      handleFilterClick={handleFilterClick}
    />
    <Results
      currentResults={currentResults}
      isExpanded={isExpanded}
      handleExpand={handleExpand}
    />
  </div>
);

Content.defaultProps = {
  currentResults: {}
};

Content.propTypes = {
  selectedFacets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool))
    .isRequired,
  currentResults: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.object
    ])
  ),
  handleFilterClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
};

export default Content;
