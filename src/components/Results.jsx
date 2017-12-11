import React from "react";
import PropTypes from "prop-types";

import ResultsItem from './ResultsItem';
import GeoLoader from './GeoLoader';

const createResultsItems = (hits, isExpanded) => {
  if (!hits) return [];

  const itemsList = hits.map(restaurant => (
    <ResultsItem restaurant={restaurant} key={restaurant.objectID} />
  ));

  return isExpanded ? itemsList : itemsList.slice(0, 3);
};

const isFullResults = (currentResults, isExpanded) => {
  if (Object.keys(currentResults).length > 0) {
    const isLastPage = Number(currentResults.nbPages) <= Number(currentResults.page) + 1;
    const isPartialFirstPage = !isExpanded && currentResults.hits.length > 3;

    return isLastPage && !isPartialFirstPage;
  }

  return null;
};

const Results = ({
  currentResults, isExpanded, handleExpand, isGeoLoading
}) => (
  <main id="results" className="results">
    <div>

      <div className="results__info">
        {
          Object.keys(currentResults).length > 0 &&
          <span>
            <span className="results__count">
              { currentResults.nbHits } results found{' '}
            </span>
            <span className="results__speed">
              in { currentResults.processingTimeMS / 1000 } seconds
            </span>
          </span>
        }
      </div>

      <ul className="results__list">
        { createResultsItems(currentResults.hits, isExpanded) }
      </ul>

    </div>

    {
      isGeoLoading ? (
        <GeoLoader />
      ) : (
        !isFullResults(currentResults, isExpanded) &&
        <button
          type="button"
          className="results__expand-btn"
          onClick={handleExpand}
        >
          Show More
        </button>
      )
    }

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
  isGeoLoading: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
};

export default Results;
