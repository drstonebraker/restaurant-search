import React from "react";
import PropTypes from "prop-types";

import Sidebar from './Sidebar';
import Results from './Results';

const Content = ({
  isExpanded, selectedFacets, currentResults, handleFilterClick, handleExpand,
  isSidebarOpen, isGeoLoading
}) => (
  <div id="content" className="content">
    <Sidebar
      facets={currentResults.facets}
      selectedFacets={selectedFacets}
      handleFilterClick={handleFilterClick}
      isSidebarOpen={isSidebarOpen}
    />
    <Results
      currentResults={currentResults}
      isExpanded={isExpanded}
      handleExpand={handleExpand}
      isGeoLoading={isGeoLoading}
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
  isSidebarOpen: PropTypes.bool.isRequired,
  isGeoLoading: PropTypes.bool.isRequired,
};

export default Content;
