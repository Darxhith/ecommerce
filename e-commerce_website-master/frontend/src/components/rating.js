import React from 'react';
import PropTypes from 'prop-types';

const Rating = (props) => {
  const { rating, numReviews } = props;

  return (
    <div className="rating" aria-label={`Rating: ${rating} out of 5`}>
      <span>
        <i className={rating >= 1
          ? 'fas fa-star'
          : rating >= 0.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'}
          aria-hidden="true"
        />
      </span>
      <span>
        <i className={rating >= 2
          ? 'fas fa-star'
          : rating >= 1.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'}
          aria-hidden="true"
        />
      </span>
      <span>
        <i className={rating >= 3
          ? 'fas fa-star'
          : rating >= 2.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'}
          aria-hidden="true"
        />
      </span>
      <span>
        <i className={rating >= 4
          ? 'fas fa-star'
          : rating >= 3.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'}
          aria-hidden="true"
        />
      </span>
      <span>
        <i className={rating >= 5
          ? 'fas fa-star'
          : rating >= 4.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'}
          aria-hidden="true"
        />
      </span>
      <span>{numReviews} reviews</span>
    </div>
  );
};

// Type checking for props
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};

export default Rating;
