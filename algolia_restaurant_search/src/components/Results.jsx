import React from "react";
import PropTypes from "prop-types";

import ResultsItem from './ResultsItem';

const createResultsItems = (hits, isExpanded) => {
  if (!hits) return [];

  const itemsList = hits.map(restaurant => (
    <ResultsItem restaurant={restaurant} key={restaurant.objectID} />
  ));

  return isExpanded ? itemsList : itemsList.slice(0, 3);
};

const Results = ({ currentResults, isExpanded }) => (
  <main id="results" className="results">
    <div>

      <div className="results__info">
        <span className="results__count">
          { currentResults.nbHits } results found{' '}
        </span>
        <span className="results__speed">
          in { currentResults.processingTimeMS / 1000 } seconds
        </span>
      </div>

      <ul className="results__list">
        { createResultsItems(currentResults.hits, isExpanded) }
      </ul>

    </div>

    <button
      type="button"
      className="results__expand-btn"
    >
      Show More
    </button>

  </main>
);

Results.defaultProps = {
  currentResults: null
};

Results.propTypes = {
  currentResults: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.object
    ])
  ),
  isExpanded: PropTypes.bool.isRequired,
};

export default Results;
