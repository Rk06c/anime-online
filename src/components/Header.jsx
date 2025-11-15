import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <header className="header">
      <h1>Ben 10 Series</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search episodes..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button className="clear-search" onClick={clearSearch}>
            ×
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;