import React from "react";
import PropTypes from "prop-types";

import SidebarSection from "./SidebarSection";

const Sidebar = ({
  facets, selectedFacets, handleFilterClick, isSidebarOpen
}) => (
  <aside
    id="sidebar"
    className={`
      sidebar
      ${isSidebarOpen ? 'sidebar--open' : ''}
    `}
  >
    <SidebarSection
      heading="Cuisine/Food Type"
      selectedItems={selectedFacets.food_type}
      facetCounts={facets.food_type}
      handleFilterClick={value => handleFilterClick("food_type", value)}
    />
    <SidebarSection
      heading="Rating"
      selectedItems={selectedFacets.stars_count}
      facetCounts={facets.stars_count}
      handleFilterClick={value => handleFilterClick("stars_count", value)}
    />
    <SidebarSection
      heading="Payment Options"
      selectedItems={selectedFacets.payment_options}
      facetCounts={facets.payment_options}
      handleFilterClick={value => handleFilterClick("payment_options", value)}
    />
    <SidebarSection
      heading="Price Range"
      selectedItems={selectedFacets.price_range}
      facetCounts={facets.price_range}
      handleFilterClick={value => handleFilterClick("price_range", value)}
    />
  </aside>
);

Sidebar.defaultProps = {
  facets: {}
};

Sidebar.propTypes = {
  facets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)),
  selectedFacets: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool))
    .isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
