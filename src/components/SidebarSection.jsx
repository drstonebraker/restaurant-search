import React from "react";
import PropTypes from "prop-types";

import SidebarSectionItem from './SidebarSectionItem';

const getStarsFacetCount = (facetValue, starsCounts) => (
  Object.keys(starsCounts).reduce((memo, rating) => {
    const isRelevantRating = Math.floor(Number(rating)) === Number(facetValue);
    const toAdd = isRelevantRating ? starsCounts[rating] : 0;
    return memo + toAdd;
  }, 0)
);

const getFacetCount = (facetValue, facetCounts) => {
  console.log(facetValue, facetCounts);
  if (!isNaN(facetValue)) return getStarsFacetCount(facetValue, facetCounts);

  let sum = facetCounts[facetValue] || 0;
  sum += facetCounts[`Contemporary ${facetValue}`] || 0;
  return sum;
};

const createSectionItems = (selectedItems, facetCounts, handleFilterClick) =>
  Object.keys(selectedItems).map(facetValue => (
    <SidebarSectionItem
      key={facetValue}
      value={facetValue}
      isSelected={selectedItems[facetValue]}
      count={getFacetCount(facetValue, facetCounts)}
      onClick={() => handleFilterClick(facetValue)}
    />
  ));

const SidebarSection = ({
  heading,
  selectedItems,
  facetCounts,
  handleFilterClick
}) => (
  <div id="sidebar-section" className="sidebar-section">
    <h6 className="sidebar-section__heading">{heading}</h6>
    <ul className="sidebar-section__list">
      {createSectionItems(selectedItems, facetCounts, handleFilterClick)}
    </ul>
  </div>
);

SidebarSection.defaultProps = {
  facetCounts: {}
};

SidebarSection.propTypes = {
  heading: PropTypes.string.isRequired,
  selectedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
  facetCounts: PropTypes.objectOf(PropTypes.number),
  handleFilterClick: PropTypes.func.isRequired,
};

export default SidebarSection;
