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
      clientLocation: false,
      currentResults: {},
      selectedFacets: {
        food_type: {
          Italian: false,
          American: false,
          Californian: false,
          French: false,
          Seafood: false,
          Japanese: false,
          Indian: false,
        },
        stars_count: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        },
        payment_options: {
          AMEX: false,
          Discover: false,
          MasterCard: false,
          Visa: false
        },
        price_range: {
          '$30 and under': false,
          '$31 to $50': false,
          '$50 and over': false,
        }
      }
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    this.getSearchResults();
    this.getClientLocation();
  }

  getClientLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const clientLocation = [position.coords.latitude, position.coords.longitude].join(", ");
        this.setState({ clientLocation }, this.getSearchResults);
      });
    }
  }

  getSearchResults(query = '') {
    let locationConfig;
    if (this.state.clientlocation) {
      locationConfig = { aroundLatLng: this.state.clientLocation };
    } else {
      locationConfig = { aroundLatLngViaIP: true };
    }
    const facets = ["food_type", "payment_options", "price_range", "stars_count"];

    const config = Object.assign({ query, facets }, locationConfig);

    index.search(config, (err, content) => {
      if (err) {
        console.error("Error on search", err);
      } else {
        this.setState({ currentResults: content }, () =>
          console.log(this.state)
        );
      }
    });
  }

  handleSearchInput(e) {
    this.getSearchResults(e.target.value);
  }

  render() {
    const { facets, selectedFacets, currentResults } = this.state;

    return (
      <div
        className="view"
        ref={(view) => { this.view = view; }}
      >
        <Header
          setRef={(header) => { this.header = header; }}
          onChange={this.handleSearchInput}
        />
        <Content
          selectedFacets={selectedFacets}
          currentResults={currentResults}
        />
      </div>
    );
  }
}

export default App;

