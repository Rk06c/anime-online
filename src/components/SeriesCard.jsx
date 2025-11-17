import React from 'react';
import { Link } from 'react-router-dom';

const SeriesCard = ({ series }) => {
  const cardStyles = {
    backgroundColor: '#1e293b',
    borderRadius: '10px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const cardImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block'
  };

  const cardContentStyles = {
    padding: '15px'
  };

  const cardTitleStyles = {
    margin: '0 0 10px 0',
    fontSize: '1.3rem',
    color: 'white'
  };

  const cardDescriptionStyles = {
    margin: 0,
    color: '#94a3b8',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  };

  // Handle image error by showing a fallback
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    // Create and show fallback element
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.cssText = `
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #0066ff, #00d4ff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
    `;
    fallbackDiv.textContent = series.title;
    e.target.parentNode.appendChild(fallbackDiv);
  };

  // Check if cover path is valid and add default image if needed
  const getImageUrl = (coverPath) => {
    if (!coverPath) return null;
    
    // If it's already a full URL, return as is
    if (coverPath.startsWith('http')) {
      return coverPath;
    }
    
    // If it's a relative path, you might need to adjust based on your public folder structure
    // For Create React App, public folder files are served from root
    return coverPath;
  };

  const imageUrl = getImageUrl(series.cover);

  return (
    <Link to={`/${series.slug}`} style={cardStyles}>
      <div style={{ position: 'relative', height: '200px' }}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={series.title}
            style={cardImageStyles}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            {series.title}
          </div>
        )}
      </div>
      <div style={cardContentStyles}>
        <h3 style={cardTitleStyles}>{series.title}</h3>
        <p style={cardDescriptionStyles}>{series.description}</p>
      </div>
    </Link>
  );
};

export default SeriesCard;