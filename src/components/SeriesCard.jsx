import React from 'react';
import { Link } from 'react-router-dom';

const SeriesCard = ({ series }) => {
  return (
    <Link to={`/${series.slug}`} className="series-card">
      <img src={series.cover} alt={series.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{series.title}</h3>
        <p className="card-description">{series.description}</p>
      </div>
    </Link>
  );
};

export default SeriesCard;