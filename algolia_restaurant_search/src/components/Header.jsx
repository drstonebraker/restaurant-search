import React from "react";
import PropTypes from "prop-types";

const Header = ({ setRef, isHeaderSticky }) => (
  <header
    className={`
      header
      ${isHeaderSticky ? "header--sticky" : ""}
    `}
    ref={setRef}
  >
    <input type="text" className="header__input" />
  </header>
);

Header.propTypes = {
  setRef: PropTypes.func.isRequired,
  isHeaderSticky: PropTypes.bool.isRequired,
};

export default Header;
