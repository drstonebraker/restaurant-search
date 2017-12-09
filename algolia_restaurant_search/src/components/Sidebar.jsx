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
    <SidebarSection
      heading="Rating"
      selectedItems={selectedFacets.stars_count}
      facetCounts={facets.star_count}
    />
    <SidebarSection
      heading="Payment Options"
      selectedItems={selectedFacets.payment_options}
      facetCounts={facets.payment_options}
    />
    <SidebarSection
      heading="Price Range"
      selectedItems={selectedFacets.price_range}
      facetCounts={facets.price_range}
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
