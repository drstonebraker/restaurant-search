import React from "react";
import PropTypes from "prop-types";

const SidebarSectionItem = ({ type, isSelected, count }) => (
  <li
    className={`
      sidebar-section-item
      ${isSelected ? "sidebar-section-item--selected" : ""}
    `}
  >
    <span className="sidebar-section-item__type">{type}</span>
    <span className="sidebar-section-item__count">{count}</span>
  </li>
);

SidebarSectionItem.defaultProps = {
  count: 0
};

SidebarSectionItem.propTypes = {
  type: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  count: PropTypes.number
};

export default SidebarSectionItem;
