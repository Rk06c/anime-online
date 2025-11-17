import React from 'react';
import { useSearch } from '../contexts/SearchContext';

const headerStyles = {
  backgroundColor: '#1e293b',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #334155'
};

const searchContainerStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const searchInputStyles = {
  padding: '10px 40px 10px 15px',
  borderRadius: '25px',
  border: '2px solid #334155',
  backgroundColor: '#0f172a',
  color: 'white',
  fontSize: '1rem',
  width: '300px',
  outline: 'none',
  ':focus': {
    borderColor: '#0066ff'
  }
};

const clearSearchStyles = {
  position: 'absolute',
  right: '10px',
  background: 'none',
  border: 'none',
  color: '#94a3b8',
  fontSize: '1.5rem',
  cursor: 'pointer',
  padding: '0',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    color: 'white'
  }
};

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <header style={headerStyles}>
      <h1 style={{ margin: 0, color: '#00d4ff' }}>Anime Series</h1>
      <div style={searchContainerStyles}>
        <input
          type="text"
          placeholder="Search episodes..."
          style={searchInputStyles}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button style={clearSearchStyles} onClick={clearSearch}>
            ×
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;