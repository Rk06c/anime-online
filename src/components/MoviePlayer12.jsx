import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovie1Data } from '../hooks/useBen10Data';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Settings, Maximize, Minimize, Home } from 'lucide-react';

// Add all the missing styles from EpisodePlayer
const playerContainerStyles = {
  padding: 'clamp(10px, 2vw, 20px)',
  maxWidth: '1400px',
  margin: '0 auto',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
};

const playerWrapperStyles = {
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  borderRadius: 'clamp(8px, 2vw, 16px)',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  backgroundColor: '#000'
};

const videoStyles = {
  width: '100%',
  height: 'auto',
  aspectRatio: '16/9',
  display: 'block'
};

const controlsContainerStyles = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  padding: 'clamp(10px, 2vw, 20px)',
  transition: 'opacity 0.3s ease',
  opacity: '1'
};

const progressBarStyles = {
  width: '100%',
  height: 'clamp(4px, 1vw, 6px)',
  backgroundColor: 'rgba(255,255,255,0.3)',
  borderRadius: '3px',
  marginBottom: 'clamp(10px, 2vw, 15px)',
  cursor: 'pointer',
  position: 'relative'
};

const progressFillStyles = {
  height: '100%',
  backgroundColor: '#00ff88',
  borderRadius: '3px',
  transition: 'width 0.1s ease'
};

const controlsRowStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'clamp(8px, 2vw, 15px)',
  flexWrap: 'wrap'
};

const leftControlsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(8px, 2vw, 15px)',
  flex: '1 1 auto',
  minWidth: 'min-content'
};

const centerControlsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(5px, 1vw, 10px)',
  flex: '0 1 auto',
  minWidth: '0',
  overflow: 'hidden'
};

const rightControlsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(8px, 2vw, 15px)',
  flex: '1 1 auto',
  justifyContent: 'flex-end',
  minWidth: 'min-content'
};

const buttonStyles = {
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  padding: 'clamp(6px, 1.5vw, 8px)',
  borderRadius: '50%',
  transition: 'background-color 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: '0'
};

const timeDisplayStyles = {
  color: 'white',
  fontSize: 'clamp(12px, 2vw, 14px)',
  fontVariantNumeric: 'tabular-nums',
  minWidth: 'clamp(80px, 15vw, 100px)',
  flexShrink: '0'
};

const volumeSliderStyles = {
  width: 'clamp(60px, 10vw, 80px)',
  height: '4px',
  backgroundColor: 'rgba(255,255,255,0.3)',
  borderRadius: '2px',
  cursor: 'pointer',
  position: 'relative',
  flexShrink: '0'
};

const volumeFillStyles = {
  height: '100%',
  backgroundColor: '#00ff88',
  borderRadius: '2px'
};

const settingsMenuStyles = {
  position: 'absolute',
  bottom: 'clamp(50px, 8vw, 60px)',
  right: '0',
  backgroundColor: 'rgba(0,0,0,0.9)',
  borderRadius: '8px',
  padding: '10px',
  minWidth: 'clamp(130px, 20vw, 150px)',
  backdropFilter: 'blur(10px)',
  zIndex: '1000'
};

const settingsOptionStyles = {
  color: 'white',
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: 'clamp(12px, 2vw, 14px)',
  transition: 'background-color 0.2s ease'
};

const MoviePlayer12 = () => {
  const { movieSlug } = useParams();
  const { data: movieData } = useMovie1Data();
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [buffered, setBuffered] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);

  const movie = movieData?.movies?.find((m) => m.slug === movieSlug);

  // Debug logging
  useEffect(() => {
    console.log('Movie Data:', movieData);
    console.log('Movie Slug:', movieSlug);
    console.log('Found Movie:', movie);
    if (movie) {
      console.log('Movie URL:', movie.cloudinaryUrl);
    }
  }, [movieData, movieSlug, movie]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (!showControls) return;
    
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(controlsTimeoutRef.current);
  }, [showControls, currentTime]);

  // Event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error('Play failed:', err);
          setError('Failed to play video: ' + err.message);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
      
      if (videoRef.current.buffered.length > 0) {
        setBuffered(videoRef.current.buffered.end(0));
      }
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleVolumeClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await videoRef.current.parentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    
    switch(e.key.toLowerCase()) {
      case ' ':
      case 'k':
        e.preventDefault();
        handlePlayPause();
        break;
      case 'f':
        handleFullscreen();
        break;
      case 'm':
        handleVolumeClick();
        break;
      case 'arrowleft':
        handleSkip(-10);
        break;
      case 'arrowright':
        handleSkip(10);
        break;
      case 'escape':
        if (showSettings) setShowSettings(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, volume, showSettings]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSettings && !e.target.closest('[data-settings]')) {
        setShowSettings(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSettings]);

  // Handle video errors
  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setError('Failed to load video. The video file may be unavailable.');
  };

  if (!movieData) {
    return (
      <div style={playerContainerStyles}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h3>Loading movie data...</h3>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={playerContainerStyles}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h3>Movie not found: {movieSlug}</h3>
          <Link 
            to="/" 
            style={{ 
              color: '#00d4ff', 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px'
            }}
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0;
  const videoUrl = movie.cloudinaryUrl;

  return (
    <div style={playerContainerStyles}>
      {/* Back to Home Button */}
      <div style={{ marginBottom: '20px' }}>
        <Link 
          to="/" 
          style={{ 
            color: '#00d4ff', 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: isMobile ? '14px' : '16px'
          }}
        >
          <Home size={isMobile ? 16 : 20} />
          Back to Home
        </Link>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: 'rgba(220, 38, 38, 0.2)',
          border: '1px solid rgba(220, 38, 38, 0.5)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong>Error:</strong> {error}
          <br />
          <small>URL: {videoUrl}</small>
        </div>
      )}

      <div 
        style={playerWrapperStyles}
        onMouseEnter={() => setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => !isMobile && setShowControls(false)}
        onTouchStart={() => setShowControls(true)}
      >
        
        {/* Video Element */}
        <video
          ref={videoRef}
          style={videoStyles}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onClick={handlePlayPause}
          onError={handleVideoError}
          playsInline
          controls={false}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
          {error && <p>Error: {error}</p>}
        </video>

        {/* Custom Controls */}
        {showControls && (
          <div style={controlsContainerStyles}>
            {/* Progress Bar */}
            <div 
              style={progressBarStyles} 
              onClick={handleProgressClick}
            >
              <div style={{
                ...progressFillStyles,
                width: `${progressPercent}%`
              }} />
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.5)',
                width: `${bufferedPercent}%`,
                borderRadius: '3px'
              }} />
            </div>

            {/* Control Buttons */}
            <div style={controlsRowStyles}>
              <div style={leftControlsStyles}>
                <button 
                  style={buttonStyles}
                  onClick={handlePlayPause}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {isPlaying ? 
                    <Pause size={isMobile ? 18 : 20} /> : 
                    <Play size={isMobile ? 18 : 20} />
                  }
                </button>

                {!isMobile && (
                  <>
                    <button 
                      style={buttonStyles}
                      onClick={() => handleSkip(-10)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <SkipBack size={16} />
                    </button>

                    <button 
                      style={buttonStyles}
                      onClick={() => handleSkip(10)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <SkipForward size={16} />
                    </button>
                  </>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    style={buttonStyles}
                    onClick={handleVolumeClick}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {isMuted || volume === 0 ? 
                      <VolumeX size={isMobile ? 16 : 18} /> : 
                      <Volume2 size={isMobile ? 16 : 18} />
                    }
                  </button>
                  
                  {!isMobile && (
                    <div 
                      style={volumeSliderStyles}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const newVolume = (e.clientX - rect.left) / rect.width;
                        handleVolumeChange({ target: { value: newVolume } });
                      }}
                    >
                      <div style={{
                        ...volumeFillStyles,
                        width: `${(isMuted ? 0 : volume) * 100}%`
                      }} />
                    </div>
                  )}
                </div>

                <div style={timeDisplayStyles}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div style={centerControlsStyles}>
                <h3 style={{ 
                  color: 'white', 
                  margin: 0, 
                  fontSize: isMobile ? '14px' : '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {movie.title}
                </h3>
              </div>

              <div style={rightControlsStyles}>
                <button 
                  style={buttonStyles}
                  onClick={() => setShowSettings(!showSettings)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  data-settings
                >
                  <Settings size={isMobile ? 16 : 18} />
                </button>

                <button 
                  style={buttonStyles}
                  onClick={handleFullscreen}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {isFullscreen ? 
                    <Minimize size={isMobile ? 16 : 18} /> : 
                    <Maximize size={isMobile ? 16 : 18} />
                  }
                </button>
              </div>
            </div>

            {/* Settings Menu */}
            {showSettings && (
              <div style={settingsMenuStyles} data-settings>
                <div style={settingsOptionStyles}>Quality: Auto</div>
                <div style={settingsOptionStyles}>
                  Speed: 
                  <select 
                    value={playbackRate}
                    onChange={(e) => {
                      const rate = parseFloat(e.target.value);
                      setPlaybackRate(rate);
                      if (videoRef.current) {
                        videoRef.current.playbackRate = rate;
                      }
                    }}
                    style={{ 
                      marginLeft: '10px', 
                      backgroundColor: 'transparent', 
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '4px',
                      padding: '2px',
                      fontSize: isMobile ? '12px' : '14px'
                    }}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div style={{ 
        color: 'white', 
        marginTop: 'clamp(15px, 3vw, 20px)', 
        maxWidth: '800px', 
        margin: 'clamp(15px, 3vw, 20px) auto',
        padding: '0 clamp(10px, 2vw, 20px)'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '20px' : '24px',
          marginBottom: 'clamp(10px, 2vw, 15px)'
        }}>
          {movie.title}
        </h2>
        {movie.description && (
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            lineHeight: '1.6',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            {movie.description}
          </p>
        )}
        <div style={{ 
          marginTop: '10px', 
          fontSize: '14px', 
          color: '#94a3b8' 
        }}>
          Video URL: {videoUrl}
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer12;