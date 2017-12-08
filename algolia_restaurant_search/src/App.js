/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHeaderSticky: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const viewOffset = this.view.offsetTop;
    if (window.pageYOffset >= viewOffset) {
      this.setState({ isHeaderSticky: true });
    } else {
      this.setState({ isHeaderSticky: false });
    }
  }

  render() {
    const { isHeaderSticky } = this.state;

    return (
      <div
        className={`
          view
        `}
        ref={(view) => { this.view = view; }}
      >
        <Header
          setRef={(header) => { this.header = header; }}
          isHeaderSticky={isHeaderSticky}
        />
      </div>
    );
  }
}

export default App;

