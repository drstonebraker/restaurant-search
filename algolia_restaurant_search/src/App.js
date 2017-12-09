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
      currentContent: null,
      facets: {},
      selectedFacets: {
        cuisine: {
          italian: false,
          american: false,
          californian: false,
          french: false,
          seafood: false,
          japanese: false,
          indian: false,
        },
        rating: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        },
        paymentOptions: {
          amex: false,
          discover: false,
          mastercard: false,
          visa: false
        },
        price: {
          low: false,
          mid: false,
          high: false,
        }
      }
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    this.getFacets();
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

  getFacets() {
    index.search({
      facets: ["food_type", "payment_options", "price_range", "stars_count"]
    }, (err, response) => {
      if (err) {
        console.error("Error on facet request", err);
      } else {
        this.setState({ facets: response.facets });
      }
    });
  }

  getSearchResults(query = '') {
    let locationConfig;
    if (this.state.clientlocation) {
      locationConfig = { aroundLatLng: this.state.clientLocation };
    } else {
      locationConfig = { aroundLatLngViaIP: true };
    }

    const config = Object.assign({ query }, locationConfig);

    index.search(config, (err, content) => {
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
    const { facets, selectedFacets, currentContent } = this.state;

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
          facets={facets}
          selectedFacets={selectedFacets}
          currentContent={currentContent}
        />
      </div>
    );
  }
}

export default App;

