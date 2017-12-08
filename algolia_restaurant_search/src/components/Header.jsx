/* eslint-disable jsx-a11y/no-autofocus */

import React from "react";
import PropTypes from "prop-types";

const Header = ({ setRef, onChange }) => (
  <header id="header" className="header" ref={setRef}>
    <input
      autoFocus
      type="text"
      className="header__input"
      placeholder="Search for Restaurants by Name, Cuisine, Location"
      onChange={onChange}
    />
  </header>
);

Header.propTypes = {
  setRef: PropTypes.func.isRequired,
};

export default Header;
