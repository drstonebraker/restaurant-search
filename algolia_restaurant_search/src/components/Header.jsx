import React from "react"
import PropTypes from "prop-types";

const Header = ({ ref }) => (
  <header
    className="header"
    ref={ref}
  >
    <input type="text" className="header__input" />
  </header>
)

Header.propTypes = {
  ref: PropTypes.func.isRequired,
}

export default Header
