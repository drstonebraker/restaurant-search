/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';

import Header from './components/Header';

const client = algoliasearch("T9X7J1FO6M", "46731abd67e0a850c6deee6223e34ffe");
const index = client.initIndex("restaurant_locator");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentContent: {}
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getAlgoliaResults(query) {
    index.search(query, (err, content) => {
      if (err) {
        console.error("Error on search", err);
      } else {
        this.setState({ currentContent: content });
      }
    });
  }

  handleScroll() {
    const viewOffset = this.view.offsetTop;
    if (window.pageYOffset >= viewOffset) {
      this.setState({ isHeaderSticky: true });
    } else {
      this.setState({ isHeaderSticky: false });
    }
  }

  handleSearchInput(e) {
    this.getAlgoliaResults(e.target.value);
  }

  render() {
    return (
      <div
        className="view"
        ref={view => {
          this.view = view;
        }}
      >
        <Header
          setRef={header => {
            this.header = header;
          }}
          onChange={this.handleSearchInput}
        />
      </div>
    );
  }
}

export default App;

