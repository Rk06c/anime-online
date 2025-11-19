import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';

import { SearchProvider, useSearch } from './contexts/SearchContext';
import Header from './components/Header';
import SeriesCard from './components/SeriesCard';
import EpisodeCard from './components/EpisodeCard';
import EpisodePlayer from './components/EpisodePlayer';
import { useBen10Data, useComingSoonData  , useMovie1Data} from './hooks/useBen10Data';
import NetflixSlider from './components/NetflixSlider';
import MoviePlayer12 from './components/Movieplayer12';
import Footer from './components/Footer';



const queryClient = new QueryClient();

const appStyles = {
  minHeight: '100vh',
  //backgroundColor: '#0f172a',
  backgroundColor: '#000000',
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

// New banner styles
const bannerSectionStyles = {
  marginTop: '60px',
  padding: '30px 20px',
  backgroundColor: '#000000',
  borderTop: '2px solid #334155'
};

const bannerTitleStyles = {
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '30px',
  background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const bannerGridStyles = {
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  maxWidth: '1200px',
  margin: '0 auto'
};

const adBannerStyles = {
  //backgroundColor: '#334155',
  backgroundColor: '#000000',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  margin: '30px auto',
  maxWidth: '1200px',
  border: '1px solid #475569'
};

const adTextStyles = {
  fontSize: '1.1rem',
  color: '#cbd5e1',
  margin: 0
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
    scale: 0.8
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

// New Banner Component
function NewSeriesBanner() {
  const { data: comingSoonData } = useComingSoonData();
  
  if (!comingSoonData) return null;

  // Filter new series or use all series for demonstration
  const newSeries = comingSoonData.comingUp.slice(0, 4); // Show first 4 as "new"

  return (
    <div style={bannerSectionStyles}>
      <h2 style={bannerTitleStyles}>Coming Soon - New Series</h2>
      <div style={bannerGridStyles}>
        {newSeries.map((series) => (
          <div 
            key={series.id} 
            style={{
              backgroundColor: '#080808',
              borderRadius: '10px',
              padding: '15px',
              textAlign: 'center',
              border: '1px solid #475569',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '90px',
              background: `url(${series.thumbnail}) center/cover no-repeat`,
              borderRadius: '8px',
              marginBottom: '10px',
              overflow: 'hidden'
            }}>
              {/* Hover overlay and play button */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                borderRadius: '8px'
              }}>
                <PlayButton />
              </div>
            </div>
            
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>{series.title}</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
              Coming Soon
            </p>

            {/* Hover effects for the image container */}
            <style>
              {`
                div[style*="position: relative"]:hover > div[style*="position: absolute"] {
                  opacity: 1 !important;
                }
                div[style*="position: relative"]:hover > div[style*="position: absolute"] > div {
                  opacity: 1 !important;
                  scale: 1 !important;
                }
              `}
            </style>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ad Banner Component
function AdBanner() {
  return (
    <div style={adBannerStyles}>
      <p style={adTextStyles}>
        🎬 <strong>anime world watch to free</strong> - New episodes added weekly! 
        Stay tuned for more exciting content. 
        <span style={{ display: 'block', marginTop: '10px', fontSize: '0.9rem' }}>
          Support us by disabling ad blocker
        </span>
      </p>
    </div>
  );
}

function Home() {
  const { data: ben10Data  } = useBen10Data();
  //const { data: comingSoonData } = useBen10Data();
    const { data: movieData } = useMovie1Data();
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
          {/* Show banners even when no search results */}
          <AdBanner />
          <NewSeriesBanner />
        </div>
      );
    }

    return (
      <>
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
        {/* Show banners after search results */}
        <AdBanner />
        <NewSeriesBanner />
      </>
    );
  }

  return (
    <>
      <div style={mainContentStyles}>
        {/* <h2 style={{ 
          marginBottom: '20px', 
          textAlign: 'center',
          fontSize: '2rem',
          background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
           watch to free
        </h2> */}
         {/* Netflix Slider Sections with Movies */}
        <NetflixSlider 
          title="Featured Movies"
          movies={movieData.movies.slice(0, 45)}
        />

         {/* <NetflixSlider 
          title="Popular Movies"
          movies={movieData.movies.slice(12, 45)}
        /> */}
        
        {/* <NetflixSlider 
          title="Popular Movies"
          movies={movieData.movies.filter(m => 
            ['incredibles', 'finding-nemo', 'toy-story'].includes(m.slug)
          )}
        /> */}

        {/* <NetflixSlider 
          title="New Arrivals"
          movies={movieData.movies.filter(m => 
            ['coco', 'moana', 'big-hero-6'].includes(m.slug)
          )}
        />

        <NetflixSlider 
          title="Classic Favorites"
          movies={movieData.movies.filter(m => 
            ['shrek', 'kung-fu-panda', 'ratatouille'].includes(m.slug)
          )}
        /> */}
        
        {/* Original grid layout for all series */}
        <h3 style={{ 
          margin: '40px 0 20px 0',
          fontSize: '1.5rem',
          color: 'white'
        }}>
          All Series
        </h3>
        <div style={gridStyles}>
          {ben10Data.series.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>
      {/* Show banners on home page */}
      <AdBanner />
      <NewSeriesBanner />
    </>
  );
}



// Add a MoviePlayer component (similar to EpisodePlayer but for movies)
function MoviePlayer() {
  const { movieSlug } = useParams();
  const { data: movieData } = useMovie1Data();

  if (!movieData) return <div style={loadingStyles}>Loading movie...</div>;

  const movie = movieData.movies.find(m => m.slug === movieSlug);
  
  if (!movie) return (
    <div style={noResultsStyles}>
      <h3>Movie not found</h3>
      <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>
        ← Back to Home
      </Link>
    </div>
  );

  return (
    <div style={mainContentStyles}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ margin: '10px 0', color: 'white' }}>{movie.title}</h1>
        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>{movie.description}</p>
      </div>
      
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* You can implement your video player here */}
        <div style={{
          width: '100%',
          height: '0',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          position: 'relative',
          backgroundColor: '#000'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(0, 212, 255, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p>Movie Player - {movie.title}</p>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '10px' }}>
                Cloudinary URL: {movie.cloudinaryUrl}
              </p>
            </div>
          </div>
        </div>
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
  if (!series) return (
    <div style={noResultsStyles}>
      <h3>Series not found</h3>
      <AdBanner />
      <NewSeriesBanner />
    </div>
  );

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
          <AdBanner />
          <NewSeriesBanner />
        </div>
      );
    }

    return (
      <>
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
        <AdBanner />
        <NewSeriesBanner />
      </>
    );
  }

  return (
    <>
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
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  background: `linear-gradient(135deg, #0066ff, #00d4ff)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  overflow: 'hidden'
                }}>
                  {/* Hover overlay and play button for season cards */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <PlayButton />
                  </div>
                  Season {season.number}
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{season.title}</h3>
                  <p style={{ margin: 0, color: '#94a3b8' }}>{season.episodes.length} Episodes</p>
                </div>

                {/* Hover effects for the season image container */}
                <style>
                  {`
                    div[style*="position: relative"]:hover > div[style*="position: absolute"] {
                      opacity: 1 !important;
                    }
                    div[style*="position: relative"]:hover > div[style*="position: absolute"] > div {
                      opacity: 1 !important;
                      scale: 1 !important;
                    }
                  `}
                </style>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <AdBanner />
      <NewSeriesBanner />
    </>
  );
}

function SeasonPage() {
  const { seriesSlug, seasonNumber } = useParams();
  const { searchTerm } = useSearch();
  const { data: ben10Data } = useBen10Data();

  if (!ben10Data) return <div style={loadingStyles}>Loading...</div>;

  const series = ben10Data.series.find((s) => s.slug === seriesSlug);
  const season = series?.seasons.find((s) => s.number === parseInt(seasonNumber));
  
  if (!season) return (
    <div style={noResultsStyles}>
      <h3>Season not found</h3>
      <AdBanner />
      <NewSeriesBanner />
    </div>
  );

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
        <AdBanner />
        <NewSeriesBanner />
      </div>
    );
  }

  return (
    <>
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
      <AdBanner />
      <NewSeriesBanner />
    </>
  );
}

function AppContent() {
  return (
    <Router>
      <SearchProvider>
        <div style={appStyles}>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:seriesSlug" element={<SeriesPage />} />
              <Route path="/:seriesSlug/:seasonNumber" element={<SeasonPage />} />
              <Route path="/:seriesSlug/:seasonNumber/:episodeNumber" element={<EpisodePlayer />} />
              <Route path="/movie/:movieSlug" element={<MoviePlayer12 />} />
            </Routes>
          </main>
          <Footer />
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