import React from "react";
import PropTypes from "prop-types";

import SidebarSectionItem from './SidebarSectionItem';

const getFacetCount = (facet, facetCounts) => {
  return facetCounts[facet] + facetCounts[`Contemporary ${facet}`];
};

const createSectionItems = (selected, facetCounts) => {
  return Object.keys(selected).map((foodType) => {
    return (
      <SidebarSectionItem
        key={foodType}
        type={foodType}
        isSelected={selected[foodType]}
        count={getFacetCount(foodType, facetCounts)}
      />
    );
  });
};

const SidebarSection = ({ heading, selected, facetCounts }) => (
  <div id="sidebar-section" className="sidebar-section">
    <h6>{heading}</h6>
    <ul>{createSectionItems(selected, facetCounts)}</ul>
  </div>
);

SidebarSection.defaultProps = {
  facetCounts: {}
};

SidebarSection.propTypes = {
  heading: PropTypes.string.isRequired,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
  facetCounts: PropTypes.objectOf(PropTypes.number)
};

export default SidebarSection;
