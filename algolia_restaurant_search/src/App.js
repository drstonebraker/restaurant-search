/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';

import Header from './components/Header';
import Content from './components/Content';

const client = algoliasearch("T9X7J1FO6M", "46731abd67e0a850c6deee6223e34ffe");
const index = client.initIndex("restaurant_locator");

class App extends Component {
  static getFacetFilter(facet) {
    const facetValues = this.state.selectedFacets[facet];

    const selected = Object.keys(facetValues).filter(value => facetValues[value]);
    const filters = selected.map(value => App.getFacetValueFilter(facet, value));

    return filters.join(' OR ');
  }

  static getFacetValueFilter(facet, value) {
    switch (facet) {
      case "stars_count":
        return `${facet} >= ${value} AND ${facet} < ${value + 1}`;
      default:
        return `${facet}:${value}`;
    }
  }

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
          Indian: false
        },
        stars_count: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false
        },
        payment_options: {
          AMEX: false,
          Discover: false,
          MasterCard: false,
          Visa: false
        },
        price_range: {
          "$30 and under": false,
          "$31 to $50": false,
          "$50 and over": false
        }
      }
    };

    this.query = '';
    this.filters = '';

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    this.getSearchResults();
    this.getClientLocation();
  }

  getClientLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const clientLocation = [
          position.coords.latitude,
          position.coords.longitude
        ].join(", ");
        this.setState({ clientLocation }, this.getSearchResults);
      });
    }
  }

  getSearchResults() {
    let locationConfig;
    if (this.state.clientlocation) {
      locationConfig = { aroundLatLng: this.state.clientLocation };
    } else {
      locationConfig = { aroundLatLngViaIP: true };
    }
    const facets = [
      "food_type",
      "payment_options",
      "price_range",
      "stars_count"
    ];
    const { filters, query } = this;

    const config = {
      query, facets, filters, ...locationConfig
    };

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
    this.query = e.target.value;
    this.getSearchResults();
  }

  handleFilterClick(facet, type) {
    const selectedFacets = { ...this.state.selectedFacets };
    selectedFacets[facet][type] = !selectedFacets[facet][type];
    this.setState({ selectedFacets }, this.updateFilter);
  }

  updateFilter() {
    const facets = Object.keys(this.state.selectedFacets);

    const filters = facets.map(facet => App.getFacetFilter(facet));

    this.filters = filters.join(" AND ");
    console.log(this.filters);
    this.getSearchResults();
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

