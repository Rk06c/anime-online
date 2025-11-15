import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';

import { SearchProvider, useSearch } from './contexts/SearchContext';
import Header from './components/Header';
import SeriesCard from './components/SeriesCard';
import EpisodeCard from './components/EpisodeCard';
import EpisodePlayer from './components/EpisodePlayer';
import { useBen10Data } from './hooks/useBen10Data';
import './index.css';

const queryClient = new QueryClient();

function Home() {
  const { data: ben10Data } = useBen10Data();
  const { searchTerm } = useSearch();
  
  if (!ben10Data) return <div className="loading">Loading...</div>;

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
        <div className="main-content">
          <h2>Search Results</h2>
          <div className="no-results">
            <h3>No episodes found matching "{searchTerm}"</h3>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content">
        <h2>Search Results for "{searchTerm}"</h2>
        <div className="episodes-grid">
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
    <div className="main-content">
      <h2>Ben 10 Series</h2>
      <div className="series-grid">
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

  if (!ben10Data) return <div className="loading">Loading...</div>;

  const series = ben10Data.series.find((s) => s.slug === seriesSlug);
  if (!series) return <div className="no-results"><h3>Series not found</h3></div>;

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
        <div className="main-content">
          <h2>Search Results in {series.title}</h2>
          <div className="no-results">
            <h3>No episodes found matching "{searchTerm}"</h3>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content">
        <h2>Search Results in {series.title} for "{searchTerm}"</h2>
        <div className="episodes-grid">
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
    <div className="main-content">
      <h2>{series.title}</h2>
      <div className="seasons-grid">
        {series.seasons.map((season) => (
          <Link to={`/${seriesSlug}/${season.number}`} key={season.id} className="season-card">
            <img src={season.cover} alt={season.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{season.title}</h3>
              <p className="card-description">{season.episodes.length} Episodes</p>
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

  if (!ben10Data) return <div className="loading">Loading...</div>;

  const series = ben10Data.series.find((s) => s.slug === seriesSlug);
  const season = series?.seasons.find((s) => s.number === parseInt(seasonNumber));
  
  if (!season) return <div className="no-results"><h3>Season not found</h3></div>;

  const filteredEpisodes = season.episodes.filter((ep) =>
    ep.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headerTitle = searchTerm 
    ? `Search Results in ${season.title} for "${searchTerm}"`
    : season.title;

  if (filteredEpisodes.length === 0 && searchTerm) {
    return (
      <div className="main-content">
        <h2>{headerTitle}</h2>
        <div className="no-results">
          <h3>No episodes found matching "{searchTerm}"</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2>{headerTitle}</h2>
      <div className="episodes-grid">
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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:seriesSlug" element={<SeriesPage />} />
          <Route path="/:seriesSlug/:seasonNumber" element={<SeasonPage />} />
          <Route path="/:seriesSlug/:seasonNumber/:episodeNumber" element={<EpisodePlayer />} />
        </Routes>
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