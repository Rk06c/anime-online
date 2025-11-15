import React from 'react';
import { Link } from 'react-router-dom';

const EpisodeCard = ({ episode, seriesSlug, seasonNumber }) => {
  return (
    <Link
      to={`/${seriesSlug}/${seasonNumber}/${episode.id}`}
      className="episode-card"
    >
      <div className="card-image" style={{ background: 'linear-gradient(135deg, #0066ff, #00d4ff)' }}>
        <h4 style={{ color: 'white', textAlign: 'center', paddingTop: '90px' }}>Ep {episode.id}</h4>
      </div>
      <div className="card-content">
        <h3 className="card-title">{episode.title}</h3>
      </div>
    </Link>
  );
};

export default EpisodeCard;