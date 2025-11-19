import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const NetflixSlider = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const sliderStyles = {
    position: 'relative',
    marginBottom: '40px',
    padding: '0 4%'
  };

  const titleStyles = {
    marginBottom: '15px',
    fontSize: '1.4vw',
    fontWeight: '600',
    color: 'white'
  };

  const sliderContainerStyles = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px'
  };

  const sliderStylesInner = {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    padding: '10px 0',
    scrollbarWidth: 'none'
  };

  const movieCardStyles = {
    flex: '0 0 auto',
    width: '250px',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, z-index 0.3s',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#1e293b',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  };

  const movieImageStyles = {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease'
  };

  const movieTitleStyles = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
    padding: '20px 15px 10px',
    fontSize: '16px',
    fontWeight: '600',
    transform: 'translateY(0)',
    opacity: '1',
    transition: 'all 0.3s ease'
  };

  const movieDescriptionStyles = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
    padding: '20px 15px 10px',
    fontSize: '14px',
    transform: 'translateY(5px)',
    opacity: '0',
    transition: 'all 0.3s ease',
    color: '#94a3b8'
  };

  const playOverlayStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  };

  const playIconStyles = {
    width: '50px',
    height: '50px',
    background: 'rgba(0, 212, 255, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(0.8) translateY(10px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
  };

  const arrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    border: 'none',
    width: '20px',
    height: '50px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: '20',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: 'opacity 0.3s, background-color 0.2s',
    borderRadius: '4px'
  };

  const arrowLeftStyles = { ...arrowStyles, left: '10px' };
  const arrowRightStyles = { ...arrowStyles, right: '10px' };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'scale()';
    card.style.zIndex = '10';
    
    const img = card.querySelector('img');
    const title = card.querySelector('[data-title]');
    const description = card.querySelector('[data-description]');
    const overlay = card.querySelector('[data-overlay]');
    const playIcon = card.querySelector('[data-play-icon]');
    
    if (img) img.style.transform = 'scale(1.1)';
    if (title) {
      title.style.transform = 'translateY(5px)';
      title.style.opacity = '0';
    }
    if (description) {
      description.style.transform = 'translateY(0)';
      description.style.opacity = '1';
    }
    if (overlay) overlay.style.opacity = '1';
    if (playIcon) {
      playIcon.style.transform = 'scale(1) translateY(0)';
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.zIndex = '1';
    
    const img = card.querySelector('img');
    const title = card.querySelector('[data-title]');
    const description = card.querySelector('[data-description]');
    const overlay = card.querySelector('[data-overlay]');
    const playIcon = card.querySelector('[data-play-icon]');
    
    if (img) img.style.transform = 'scale(1)';
    if (title) {
      title.style.transform = 'translateY(0)';
      title.style.opacity = '1';
    }
    if (description) {
      description.style.transform = 'translateY(5px)';
      description.style.opacity = '0';
    }
    if (overlay) overlay.style.opacity = '0';
    if (playIcon) {
      playIcon.style.transform = 'scale(0.8) translateY(10px)';
    }
  };

  const handleContainerMouseEnter = (e) => {
    const arrows = e.currentTarget.querySelectorAll('[data-arrow]');
    arrows.forEach(arrow => {
      arrow.style.opacity = '1';
    });
  };

  const handleContainerMouseLeave = (e) => {
    const arrows = e.currentTarget.querySelectorAll('[data-arrow]');
    arrows.forEach(arrow => {
      arrow.style.opacity = '0';
    });
  };

  return (
    <div style={sliderStyles}>
      <h2 style={titleStyles}>{title}</h2>
      <div 
        style={sliderContainerStyles}
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
      >
        <button 
          style={arrowLeftStyles}
          onClick={scrollLeft}
          data-arrow
        >
          ‹
        </button>
        
        <div 
          ref={sliderRef}
          style={sliderStylesInner}
          className="slider"
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.slug}`}
              style={movieCardStyles}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={movie.cover} 
                alt={movie.title}
                style={movieImageStyles}
                onError={(e) => {
                  e.target.style.display = 'none';
                  // Fallback background
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #0066ff, #00d4ff)';
                  e.target.parentNode.style.display = 'flex';
                  e.target.parentNode.style.alignItems = 'center';
                  e.target.parentNode.style.justifyContent = 'center';
                  e.target.parentNode.style.color = 'white';
                  e.target.parentNode.style.fontSize = '16px';
                  e.target.parentNode.style.fontWeight = 'bold';
                }}
              />
              
              <div style={movieTitleStyles} data-title>
                {movie.title}
              </div>
              
              <div style={movieDescriptionStyles} data-description>
                {movie.description}
              </div>
              
              <div style={playOverlayStyles} data-overlay>
                <div style={playIconStyles} data-play-icon>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="white"
                    style={{ marginLeft: '2px' }}
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <button 
          style={arrowRightStyles}
          onClick={scrollRight}
          data-arrow
        >
          ›
        </button>
      </div>

      <style>
        {`
          .slider::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default NetflixSlider;