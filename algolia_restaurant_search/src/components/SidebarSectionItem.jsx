import React from "react";
import PropTypes from "prop-types";

const SidebarSectionItem = ({ key }) => (
  <li key={key} className="sidebar-section-item">

  </li>
);

SidebarSectionItem.propTypes = {
  key: PropTypes.number.isRequired
};

export default SidebarSectionItem;