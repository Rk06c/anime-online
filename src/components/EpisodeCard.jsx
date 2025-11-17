import React from 'react';
import { Link } from 'react-router-dom';

const episodeCardStyles = {
  backgroundColor: '#1e293b',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  ':hover': {
    transform: 'scale(1.05)'
  }
};

const cardImageStyles = {
  width: '100%',
  height: '120px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const episodeNumberOverlayStyles = {
  position: 'absolute',
  top: '8px',
  left: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const fallbackImageStyles = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const cardContentStyles = {
  padding: '15px'
};

const cardTitleStyles = {
  margin: 0,
  fontSize: '1rem',
  color: 'white',
  textAlign: 'center'
};

const EpisodeCard = ({ episode, seriesSlug, seasonNumber }) => {
  // Use episode image if available, otherwise show fallback
  const imageStyle = episode.imageUrl 
    ? {
        ...cardImageStyles,
        backgroundImage: `url(${episode.imageUrl})`
      }
    : fallbackImageStyles;

  return (
    <Link
      to={`/${seriesSlug}/${seasonNumber}/${episode.id}`}
      style={episodeCardStyles}
    >
      <div style={imageStyle}>
        {episode.imageUrl && (
          <div style={episodeNumberOverlayStyles}>
            Ep {episode.id}
          </div>
        )}
        {!episode.imageUrl && (
          <h4 style={{ color: 'white', margin: 0 }}>Ep {episode.id}</h4>
        )}
      </div>
      <div style={cardContentStyles}>
        <h3 style={cardTitleStyles}>{episode.title}</h3>
      </div>
    </Link>
  );
};

export default EpisodeCard;