/* eslint-disable jsx-a11y/no-autofocus */

import React from "react";
import PropTypes from "prop-types";

import MenuButton from './MenuButton';

const Header = ({
  setRef, onChange, handleOpenSidebar, query
}) => (
  <header id="header" className="header" ref={setRef}>
    <MenuButton onClick={handleOpenSidebar} />
    <input
      autoFocus
      type="text"
      className="header__input"
      placeholder="Search for Restaurants by Name, Cuisine, Location"
      onChange={onChange}
      value={query}
    />
  </header>
);

Header.propTypes = {
  setRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleOpenSidebar: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default Header;
