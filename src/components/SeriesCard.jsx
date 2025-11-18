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
    transition: 'none' // No transition for the entire card
  };

  const cardImageContainerStyles = {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  };

  const cardImageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease'
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

  // Play Button Component
  const PlayButton = () => (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60px',
      height: '60px',
      backgroundColor: 'rgba(0, 212, 255, 0.9)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      opacity: 0,
      scale: '0.8'
    }}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="white"
        style={{ marginLeft: '3px' }}
      >
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>
  );

  // Hover Overlay
  const HoverOverlay = () => (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.3s ease',
      opacity: 0
    }}>
      <PlayButton />
    </div>
  );

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
      position: relative;
    `;
    fallbackDiv.textContent = series.title;
    
    // Add hover overlay to fallback as well
    const hoverOverlay = document.createElement('div');
    hoverOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
      opacity: 0;
      border-radius: 0;
    `;
    
    const playButton = document.createElement('div');
    playButton.style.cssText = `
      width: 60px;
      height: 60px;
      background: rgba(0, 212, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      opacity: 0;
      transform: scale(0.8);
    `;
    
    playButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style="margin-left: 3px;">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;
    
    hoverOverlay.appendChild(playButton);
    fallbackDiv.appendChild(hoverOverlay);
    
    // Add hover effects for fallback
    fallbackDiv.onmouseenter = () => {
      hoverOverlay.style.opacity = '1';
      playButton.style.opacity = '1';
      playButton.style.transform = 'scale(1)';
    };
    
    fallbackDiv.onmouseleave = () => {
      hoverOverlay.style.opacity = '0';
      playButton.style.opacity = '0';
      playButton.style.transform = 'scale(0.8)';
    };
    
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

  // Handle mouse enter on image container
  const handleMouseEnter = (e) => {
    const img = e.currentTarget.querySelector('img');
    const overlay = e.currentTarget.querySelector('[data-hover-overlay]');
    const playButton = e.currentTarget.querySelector('[data-play-button]');
    
    if (img) {
      img.style.transform = 'scale(1.1)';
    }
    if (overlay) {
      overlay.style.opacity = '1';
    }
    if (playButton) {
      playButton.style.opacity = '1';
      playButton.style.scale = '1';
    }
  };

  // Handle mouse leave on image container
  const handleMouseLeave = (e) => {
    const img = e.currentTarget.querySelector('img');
    const overlay = e.currentTarget.querySelector('[data-hover-overlay]');
    const playButton = e.currentTarget.querySelector('[data-play-button]');
    
    if (img) {
      img.style.transform = 'scale(1)';
    }
    if (overlay) {
      overlay.style.opacity = '0';
    }
    if (playButton) {
      playButton.style.opacity = '0';
      playButton.style.scale = '0.8';
    }
  };

  return (
    <Link to={`/${series.slug}`} style={cardStyles}>
      <div 
        style={cardImageContainerStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={series.title}
              style={cardImageStyles}
              onError={handleImageError}
              loading="lazy"
            />
            <HoverOverlay />
          </>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            position: 'relative'
          }}>
            {series.title}
            <HoverOverlay />
          </div>
        )}
      </div>
      <div style={cardContentStyles}>
        <h3 style={cardTitleStyles}>{series.title}</h3>
        <p style={cardDescriptionStyles}>{series.description}</p>
      </div>

      {/* CSS for hover effects */}
      <style>
        {`
          [data-hover-overlay] {
            opacity: 0;
          }
          [data-play-button] {
            opacity: 0;
            scale: 0.8;
          }
        `}
      </style>
    </Link>
  );
};

export default SeriesCard;