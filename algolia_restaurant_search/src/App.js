/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';

import Header from './components/Header';
import Content from './components/Content';

const client = algoliasearch("T9X7J1FO6M", "46731abd67e0a850c6deee6223e34ffe");
const index = client.initIndex("restaurant_locator");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentContent: {}
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    this.getFacets();
  }

  getFacets() {
    index.search({
      facets: ["food_type", "payment_options", "price_range", "stars_count"]
    }, (err, response) => {
      this
      console.log(response);
    });
  }

  getSearchResults(query) {
    index.search(query, (err, content) => {
      if (err) {
        console.error("Error on search", err);
      } else {
        this.setState({ currentContent: content });
      }
    });
  }

  handleSearchInput(e) {
    this.getSearchResults(e.target.value);
  }

  render() {
    return (
      <div
        className="view"
        ref={(view) => { this.view = view; }}
      >
        <Header
          setRef={(header) => { this.header = header; }}
          onChange={this.handleSearchInput}
        />
        <Content />
      </div>
    );
  }
}

export default App;

