import React from "react";
import PropTypes from "prop-types";

const SidebarSectionItem = ({ type, isSelected, count, onClick }) => (
  <li>
    <button
      className={`
        sidebar-section-item
        ${isSelected ? "sidebar-section-item--selected" : ""}
      `}
      type="button"
      onClick={onClick}
    >
      <span className="sidebar-section-item__type">{type}</span>
      <span className="sidebar-section-item__count">{count}</span>
    </button>
  </li>
);

SidebarSectionItem.defaultProps = {
  count: 0
};

SidebarSectionItem.propTypes = {
  type: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default SidebarSectionItem;
