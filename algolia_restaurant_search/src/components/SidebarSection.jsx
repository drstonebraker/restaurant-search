import React from "react";
import PropTypes from "prop-types";

import SidebarSectionItem from './SidebarSectionItem';

const getFacetCount = (facet, facetCounts) => (
  facetCounts[facet] + facetCounts[`Contemporary ${facet}`]
);

const createSectionItems = (selectedItems, facetCounts) => (
  Object.keys(selectedItems).map(foodType => (
    <SidebarSectionItem
      key={foodType}
      type={foodType}
      isSelected={selectedItems[foodType]}
      count={getFacetCount(foodType, facetCounts)}
    />
  ))
);

const SidebarSection = ({ heading, selectedItems, facetCounts }) => (
  <div id="sidebar-section" className="sidebar-section">
    <h6>{heading}</h6>
    <ul>{createSectionItems(selectedItems, facetCounts)}</ul>
  </div>
);

SidebarSection.defaultProps = {
  facetCounts: {}
};

SidebarSection.propTypes = {
  heading: PropTypes.string.isRequired,
  selectedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
  facetCounts: PropTypes.objectOf(PropTypes.number)
};

export default SidebarSection;
