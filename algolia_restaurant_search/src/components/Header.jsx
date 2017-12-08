import React from "react";
import PropTypes from "prop-types";

const Header = ({ setRef }) => (
  <header
    id="header"
    className="header"
    ref={setRef}
  >
    <input type="text" className="header__input" />
  </header>
);

Header.propTypes = {
  setRef: PropTypes.func.isRequired,
};

export default Header;
