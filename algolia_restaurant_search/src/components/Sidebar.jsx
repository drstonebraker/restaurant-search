import React from "react";
import PropTypes from "prop-types";

import SidebarSection from "./SidebarSection";

const Sidebar = ({ facets, selectedFacets }) => (
  <aside id="sidebar" className="sidebar">
    <SidebarSection
      heading="Cuisine/Food Type"
      selectedItems={selectedFacets.food_type}
      facetCounts={facets.food_type}
    />
  </aside>
);

Sidebar.defaultProps = {
  facets: {}
};

Sidebar.propTypes = {
  facets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
  selectedFacets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool))
    .isRequired
};

export default Sidebar;
