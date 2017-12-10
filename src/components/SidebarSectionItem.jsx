import React from "react";
import PropTypes from "prop-types";

import StarRating from './StarRating';

const isNumeric = value => !isNaN(value);

const SidebarSectionItem = ({
  value, isSelected, count, onClick
}) => (
  <li>
    <button
      className={`
        sidebar-section-item
        ${isSelected ? "sidebar-section-item--selected" : ""}
      `}
      type="button"
      onClick={onClick}
    >
      <span className="sidebar-section-item__type">
        { isNumeric(value) ? <StarRating rating={Number(value)} /> : value }
      </span>
      <span className="sidebar-section-item__count">{count}</span>
    </button>
  </li>
);

SidebarSectionItem.defaultProps = {
  count: 0
};

SidebarSectionItem.propTypes = {
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default SidebarSectionItem;
