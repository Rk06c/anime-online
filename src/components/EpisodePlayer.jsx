import React from 'react';
import { useParams } from 'react-router-dom';
import { useBen10Data } from '../hooks/useBen10Data';

const EpisodePlayer = () => {
  const { seriesSlug, seasonNumber, episodeNumber } = useParams();
  const { data: ben10Data } = useBen10Data();

  const series = ben10Data?.series?.find((s) => s.slug === seriesSlug);
  const season = series?.seasons?.find((s) => s.number === parseInt(seasonNumber));
  const episode = season?.episodes?.find((e) => e.id === parseInt(episodeNumber));

  if (!episode) {
    return <div className="no-results"><h3>Episode not found</h3></div>;
  }

  return (
    <div className="player-container">
      <h2>{episode.title}</h2>
      <iframe
        src={`https://www.youtube.com/embed/${episode.youtubeId}`}
        title={episode.title}
        className="player-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EpisodePlayer;