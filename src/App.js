/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';

import Header from './components/Header';
import Content from './components/Content';

const client = algoliasearch("T9X7J1FO6M", "46731abd67e0a850c6deee6223e34ffe");
const index = client.initIndex("restaurant_locator");

class App extends Component {
  static getFacetValueFilter(facet, value) {
    switch (facet) {
      case "stars_count":
        return `${facet}: ${value} TO ${Number(value) + 0.9}`;
      case "food_type":
        return `${facet}:"${value}" OR ${facet}:"Contemporary ${value}"`;
      default:
        return `${facet}:"${value}"`;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      clientLocation: false,
      currentResults: undefined,
      isGeoLoading: true,
      isExpanded: false,
      isSidebarOpen: false,
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

    this.filters = "";

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleOpenSidebar = this.handleOpenSidebar.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  // ***********************
  // React lifecycle methods
  // ***********************

  componentDidMount() {
    this.getSearchResults();
    this.getClientLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkQueryUpdate(prevState);
    this.checkLocationUpdate(prevState);
    this.checkSidebarUpdate(prevState);
  }

  componentWillUnmount() {
    this.removeCloseSidebarEventListener();
  }

  // ***********************
  // getter methods
  // ***********************

  getClientLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const clientLocation = [
          position.coords.latitude,
          position.coords.longitude
        ].join(", ");
        this.setState({ clientLocation, isGeoLoading: false });
      }, (error) => {
        this.setState({ isGeoLoading: false });
      }, { timeout: 10000 });
    } else {
      this.setState({ isGeoLoading: false });
    }
  }

  getSearchResults(isNextPage = false) {
    const { currentResults } = this.state;

    const config = this.buildSearchConfig(isNextPage);

    index.search(config, (err, content) => {
      if (err) {
        console.error("Error on search", err);
      } else {
        if (isNextPage) {
          content.hits = currentResults.hits.concat(content.hits);
        }

        this.setState({ currentResults: content, isExpanded: isNextPage });
      }
    });
  }

  // ***********************
  // update methods
  // ***********************

  checkQueryUpdate(prevState) {
    const prevQuery = prevState.query;
    const { query } = this.state;

    if (prevQuery !== query) {
      this.getSearchResults();
    }
  }

  checkLocationUpdate(prevState) {
    const prevClientLocation = prevState.clientLocation;
    const { clientLocation } = this.state;

    if (!prevClientLocation && clientLocation) {
      // found client location
      this.getSearchResults();
    }
  }

  checkSidebarUpdate(prevState) {
    const prevIsSidebarOpen = prevState.isSidebarOpen;
    const { isSidebarOpen } = this.state;

    if (!prevIsSidebarOpen && isSidebarOpen) {
      // just opened sidebar
      document.body.addEventListener('click', this.handleCloseSidebar);
    } else if (prevIsSidebarOpen && !isSidebarOpen) {
      // just closed sidebar
      this.removeCloseSidebarEventListener();
    }
  }

  // ***********************
  // extracted logic methods
  // ***********************

  buildSearchConfig(isNextPage) {
    const { clientLocation, currentResults, query } = this.state;
    const page = isNextPage ? currentResults.page + 1 : 0;

    let locationConfig;
    if (clientLocation) {
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
    const { filters } = this;

    const config = {
      query,
      facets,
      filters,
      page,
      ...locationConfig
    };

    return config;
  }

  updateFilter() {
    const facets = Object.keys(this.state.selectedFacets);

    const filters = facets
      .map(facet => this.buildFacetFilter(facet))
      .filter(filter => filter.length > 0);

    this.filters = filters.join(" AND ");
    this.getSearchResults();
  }

  buildFacetFilter(facet) {
    const facetValues = this.state.selectedFacets[facet];

    const selected = Object.keys(facetValues).filter(value => facetValues[value]);
    const filters = selected.map(value => App.getFacetValueFilter(facet, value));

    const joinedFilters = filters.join(" OR ");
    return joinedFilters.includes(' OR ') ? `(${joinedFilters})` : joinedFilters;
  }

  removeCloseSidebarEventListener() {
    document.body.removeEventListener('click', this.handleCloseSidebar);
  }

  // ***********************
  // event handlers
  // ***********************

  handleSearchInput(e) {
    this.setState({ query: e.target.value });
  }

  handleFilterClick(facet, value) {
    const selectedFacets = { ...this.state.selectedFacets };
    selectedFacets[facet][value] = !selectedFacets[facet][value];
    this.setState({ selectedFacets }, this.updateFilter);
  }

  handleExpand() {
    if (this.state.isExpanded) {
      this.getSearchResults(true);
    } else {
      this.setState({ isExpanded: true });
    }
  }

  handleOpenSidebar() {
    if (!this.state.isSidebarOpen) {
      this.setState({ isSidebarOpen: true });
    }
  }

  handleCloseSidebar(e) {
    e.preventDefault();
    const sidebar = document.getElementById('sidebar');

    if (!sidebar.contains(e.target)) {
      this.setState({ isSidebarOpen: false });
    }
  }

  // ***********************
  // render
  // ***********************

  render() {
    const {
      selectedFacets, currentResults, isExpanded, isSidebarOpen, isGeoLoading,
      query
    } = this.state;

    return (
      <div
        className="view"
        ref={(view) => { this.view = view; }}
      >
        <Header
          setRef={(header) => { this.header = header; }}
          onChange={this.handleSearchInput}
          handleOpenSidebar={this.handleOpenSidebar}
          query={query}
        />
        <Content
          selectedFacets={selectedFacets}
          currentResults={currentResults}
          handleFilterClick={this.handleFilterClick}
          isExpanded={isExpanded}
          handleExpand={this.handleExpand}
          isSidebarOpen={isSidebarOpen}
          isGeoLoading={isGeoLoading}
        />
      </div>
    );
  }
}

export default App;

