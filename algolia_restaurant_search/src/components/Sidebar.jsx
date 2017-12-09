import React from "react";
import PropTypes from "prop-types";

import SidebarSection from "./SidebarSection";

const Sidebar = () => (
  <aside id="sidebar" className="sidebar">
    <SidebarSection 
      heading='Cuisine/Food Type'  
    />
  </aside>
);

Sidebar.propTypes = {

};

export default Sidebar;
