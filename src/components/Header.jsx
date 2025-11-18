import React, { useState, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [isMobile, setIsMobile] = useState(false);
  const [clearHover, setClearHover] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const headerStyles = {
    backgroundColor: '#1e293b',
    padding: isMobile ? '15px' : '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #334155',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '10px' : '0'
  };

  const titleStyles = {
    margin: isMobile ? '0 0 10px 0' : 0,
    color: '#00d4ff',
    fontSize: isMobile ? '1.5rem' : '2rem',
    textAlign: isMobile ? 'center' : 'left'
  };

  const searchContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: isMobile ? '100%' : 'auto',
    maxWidth: isMobile ? 'none' : '300px'
  };

  const searchInputStyles = {
    padding: '10px 40px 10px 15px',
    borderRadius: '25px',
    border: '2px solid #334155',
    backgroundColor: '#0f172a',
    color: 'white',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    // Note: Inline styles can't handle :focus; consider CSS classes for advanced pseudo-states
  };

  const clearSearchStyles = {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    color: clearHover ? 'white' : '#94a3b8',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Note: Hover handled via state
  };

  return (
    <header style={headerStyles}>
      <h1 style={titleStyles}>Anime Series</h1>
      <div style={searchContainerStyles}>
        <input
          type="text"
          placeholder="Search episodes..."
          style={searchInputStyles}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button 
            style={clearSearchStyles} 
            onClick={clearSearch}
            onMouseEnter={() => setClearHover(true)}
            onMouseLeave={() => setClearHover(false)}
          >
            ×
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;