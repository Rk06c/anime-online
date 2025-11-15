import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Comment out to persist search across navigation
  // useEffect(() => {
  //   const paths = location.pathname.split('/');
  //   if (paths.length <= 2) {
  //     setSearchTerm('');
  //   }
  // }, [location.pathname]);

  const value = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};