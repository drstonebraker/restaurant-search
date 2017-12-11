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
      default:
        return `${facet}:"${value}"`;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
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

    this.query = "";
    this.filters = "";

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleOpenSidebar = this.handleOpenSidebar.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {
    this.getSearchResults();
    this.getClientLocation();
  }

  componentDidUpdate(prevProps, prevState) {
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

  componentWillUnmount() {
    this.removeCloseSidebarEventListener();
  }

  getClientLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { isExpanded } = this.state;
        const clientLocation = [
          position.coords.latitude,
          position.coords.longitude
        ].join(", ");
        this.setState({ clientLocation, isGeoLoading: false }, () => isExpanded || this.getSearchResults());
      }, (error) => {
        this.setState({ isGeoLoading: false })
      });
    } else {
      this.setState({ isGeoLoading: false })
    }
  }

  getSearchResults(isNextPage = false) {
    const { clientLocation, currentResults } = this.state;
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
    const { filters, query } = this;

    const config = {
      query,
      facets,
      filters,
      page,
      ...locationConfig
    };

    index.search(config, (err, content) => {
      if (err) {
        console.error("Error on search", err);
      } else {
        if (isNextPage) {
          content.hits = currentResults.hits.concat(content.hits);
        }

        this.setState({ currentResults: content, isExpanded: isNextPage }, () =>
          console.log(this.state)
        );
      }
    });
  }

  getFacetFilter(facet) {
    const facetValues = this.state.selectedFacets[facet];

    const selected = Object.keys(facetValues).filter(value => facetValues[value]);
    const filters = selected.map(value => App.getFacetValueFilter(facet, value));

    const joinedFilters = filters.join(" OR ");
    return filters.length > 1 ? `(${joinedFilters})` : joinedFilters;
  }

  removeCloseSidebarEventListener() {
    document.body.removeEventListener('click', this.handleCloseSidebar);
  }

  handleSearchInput(e) {
    this.query = e.target.value;
    this.getSearchResults();
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
    e.stopPropagation();
    e.preventDefault();
    const sidebar = document.getElementById('sidebar');

    if (!sidebar.contains(e.target)) {
      this.setState({ isSidebarOpen: false });
    }
  }

  updateFilter() {
    const facets = Object.keys(this.state.selectedFacets);

    const filters = facets
      .map(facet => this.getFacetFilter(facet))
      .filter(filter => filter.length > 0);

    this.filters = filters.join(" AND ");
    console.log(this.filters);
    this.getSearchResults();
  }

  render() {
    const {
      selectedFacets, currentResults, isExpanded, isSidebarOpen, isGeoLoading
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

