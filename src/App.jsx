import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';

import { SearchProvider, useSearch } from './contexts/SearchContext';
import Header from './components/Header';
import SeriesCard from './components/SeriesCard';
import EpisodeCard from './components/EpisodeCard';
import EpisodePlayer from './components/EpisodePlayer';
import { useBen10Data } from './hooks/useBen10Data';

const queryClient = new QueryClient();

const appStyles = {
  minHeight: '100vh',
  backgroundColor: '#0f172a',
  color: 'white',
  fontFamily: 'Arial, sans-serif'
};

const mainContentStyles = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const loadingStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: '1.5rem'
};

const noResultsStyles = {
  textAlign: 'center',
  padding: '40px',
  fontSize: '1.2rem'
};

const gridStyles = {
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
};

function Home() {
  const { data: ben10Data } = useBen10Data();
  const { searchTerm } = useSearch();
  
  if (!ben10Data) return <div style={loadingStyles}>Loading...</div>;

  if (searchTerm) {
    let allEpisodes = [];
    ben10Data.series.forEach((series) => {
      series.seasons.forEach((season) => {
        season.episodes
          .filter((ep) => ep.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .forEach((ep) => {
            allEpisodes.push({ ...ep, seriesSlug: series.slug, seasonNumber: season.number });
          });
      });
    });

    if (allEpisodes.length === 0) {
      return (
        <div style={mainContentStyles}>
          <h2 style={{ marginBottom: '20px' }}>Search Results</h2>
          <div style={noResultsStyles}>
            <h3>No episodes found matching "{searchTerm}"</h3>
          </div>
        </div>
      );
    }

    return (
      <div style={mainContentStyles}>
        <h2 style={{ marginBottom: '20px' }}>Search Results for "{searchTerm}"</h2>
        <div style={gridStyles}>
          {allEpisodes.map((episode) => (
            <EpisodeCard
              key={`${episode.seriesSlug}-${episode.seasonNumber}-${episode.id}`}
              episode={episode}
              seriesSlug={episode.seriesSlug}
              seasonNumber={episode.seasonNumber}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={mainContentStyles}>
      <h2 style={{ marginBottom: '20px' }}>Ben 10 Series</h2>
      <div style={gridStyles}>
        {ben10Data.series.map((series) => (
          <SeriesCard key={series.id} series={series} />
        ))}
      </div>
    </div>
  );
}

function SeriesPage() {
  const { seriesSlug } = useParams();
  const { searchTerm } = useSearch();
  const { data: ben10Data } = useBen10Data();

  if (!ben10Data) return <div style={loadingStyles}>Loading...</div>;

  const series = ben10Data.series.find((s) => s.slug === seriesSlug);
  if (!series) return <div style={noResultsStyles}><h3>Series not found</h3></div>;

  if (searchTerm) {
    let seriesEpisodes = [];
    series.seasons.forEach((season) => {
      season.episodes
        .filter((ep) => ep.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .forEach((ep) => {
          seriesEpisodes.push({ ...ep, seasonNumber: season.number });
        });
    });

    if (seriesEpisodes.length === 0) {
      return (
        <div style={mainContentStyles}>
          <h2 style={{ marginBottom: '20px' }}>Search Results in {series.title}</h2>
          <div style={noResultsStyles}>
            <h3>No episodes found matching "{searchTerm}"</h3>
          </div>
        </div>
      );
    }

    return (
      <div style={mainContentStyles}>
        <h2 style={{ marginBottom: '20px' }}>Search Results in {series.title} for "{searchTerm}"</h2>
        <div style={gridStyles}>
          {seriesEpisodes.map((episode) => (
            <EpisodeCard
              key={`${seriesSlug}-${episode.seasonNumber}-${episode.id}`}
              episode={episode}
              seriesSlug={seriesSlug}
              seasonNumber={episode.seasonNumber}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={mainContentStyles}>
      <h2 style={{ marginBottom: '20px' }}>{series.title}</h2>
      <div style={gridStyles}>
        {series.seasons.map((season) => (
          <Link 
            to={`/${seriesSlug}/${season.number}`} 
            key={season.id} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '10px',
              overflow: 'hidden',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              ':hover': {
                transform: 'scale(1.05)'
              }
            }}>
              <div style={{
                width: '100%',
                height: '200px',
                background: `linear-gradient(135deg, #0066ff, #00d4ff)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                Season {season.number}
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{season.title}</h3>
                <p style={{ margin: 0, color: '#94a3b8' }}>{season.episodes.length} Episodes</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SeasonPage() {
  const { seriesSlug, seasonNumber } = useParams();
  const { searchTerm } = useSearch();
  const { data: ben10Data } = useBen10Data();

  if (!ben10Data) return <div style={loadingStyles}>Loading...</div>;

  const series = ben10Data.series.find((s) => s.slug === seriesSlug);
  const season = series?.seasons.find((s) => s.number === parseInt(seasonNumber));
  
  if (!season) return <div style={noResultsStyles}><h3>Season not found</h3></div>;

  const filteredEpisodes = season.episodes.filter((ep) =>
    ep.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headerTitle = searchTerm 
    ? `Search Results in ${season.title} for "${searchTerm}"`
    : season.title;

  if (filteredEpisodes.length === 0 && searchTerm) {
    return (
      <div style={mainContentStyles}>
        <h2 style={{ marginBottom: '20px' }}>{headerTitle}</h2>
        <div style={noResultsStyles}>
          <h3>No episodes found matching "{searchTerm}"</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={mainContentStyles}>
      <h2 style={{ marginBottom: '20px' }}>{headerTitle}</h2>
      <div style={gridStyles}>
        {filteredEpisodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            seriesSlug={seriesSlug}
            seasonNumber={seasonNumber}
          />
        ))}
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Router>
      <SearchProvider>
        <div style={appStyles}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:seriesSlug" element={<SeriesPage />} />
            <Route path="/:seriesSlug/:seasonNumber" element={<SeasonPage />} />
            <Route path="/:seriesSlug/:seasonNumber/:episodeNumber" element={<EpisodePlayer />} />
          </Routes>
        </div>
      </SearchProvider>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;