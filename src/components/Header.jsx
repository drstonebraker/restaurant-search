/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from "react";
import PropTypes from "prop-types";

import MenuButton from './MenuButton';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const input = document.querySelector('#header__input');
    input.addEventListener('input', this.handleInput);
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;
    if (inputValue !== prevState.inputValue) {
      this.props.handleSearchInput(inputValue);
    }
  }

  handleInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const { setRef, handleOpenSidebar, query } = this.props;
    const { inputValue } = this.state;

    return (
      <header id="header" className="header" ref={setRef}>
        <MenuButton onClick={handleOpenSidebar} />
        <input
          id="header__input"
          autoFocus
          type="text"
          className="header__input"
          placeholder="Search for Restaurants by Name, Cuisine, Location"
          value={query}
          aria-label="Search for restaurants"
        />
      </header>
    );
  }
}

// const Header = ({
//   setRef, handleSearchInput, handleOpenSidebar, query
// }) => (
//   <header id="header" className="header" ref={setRef}>
//     <MenuButton onClick={handleOpenSidebar} />
//     <input
//       autoFocus
//       type="text"
//       className="header__input"
//       placeholder="Search for Restaurants by Name, Cuisine, Location"
//       onChange={onChange}
//       value={query}
//       aria-label="Search for restaurants"
//     />
//   </header>
// );

Header.propTypes = {
  setRef: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  handleOpenSidebar: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default Header;
