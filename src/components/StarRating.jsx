import React from "react";
import PropTypes from "prop-types";

const calculateRatingWidth = (rating) => {
  // based on values on .stars class in styles/modules/star_rating.scss
  const starWidth = 15;
  const totalRatingWidth = 82;

  const totalStarWidth = starWidth * 5;
  const totalGutterWidth = totalRatingWidth - totalStarWidth;

  const gutterWidth = totalGutterWidth / 4;
  const numGutters = Math.floor(rating);
  const gutterWidthsSum = gutterWidth * numGutters;
  const ratingRatio = rating / 5;
  const starWidthsSum = ratingRatio * totalStarWidth;

  return starWidthsSum + gutterWidthsSum;
};

const StarRating = ({ rating }) => (
  <span aria-label={`A star rating of ${rating}`} className="star-rating">
    <span className="stars stars--empty" />
    <span
      style={{ width: calculateRatingWidth(rating) }}
      className="stars stars--active"
    />
  </span>
);

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
