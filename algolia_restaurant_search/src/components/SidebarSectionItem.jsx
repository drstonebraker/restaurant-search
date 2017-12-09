import React from "react";
import PropTypes from "prop-types";

const SidebarSectionItem = ({ type }) => (
  <li className="sidebar-section-item" />
);

SidebarSectionItem.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SidebarSectionItem;