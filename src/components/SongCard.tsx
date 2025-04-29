import React, { useState } from 'react';

interface SongCardProps {
  artist: string;
  title: string;
  lyrics: string;
  onDelete: () => void;
  isExpanded: boolean;
  onToggleLyrics: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ 
  artist, 
  title, 
  lyrics, 
  onDelete, 
  isExpanded,
  onToggleLyrics 
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="song-card">
      <div className="song-header">
        <div className="song-info">
          <p className="artist-name">{artist}</p>
          <h2 className="song-title">{title}</h2>
        </div>
        <div className="song-controls">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="control-icon down-icon song-control-desktop-only up-down-icon"
            onClick={onToggleLyrics}
          >
            <path d={isExpanded ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
          </svg>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="control-icon song-control-desktop-only delete-icon"
            onClick={onDelete}
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="song-control-mobile-only"
            onClick={toggleMenu}
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
        <div className="song-control-menu" style={{ display: isMenuVisible ? 'flex' : 'none' }}>
          <div className="song-control-menu-item song-control-menu-item-hide song-control-menu-item-divider" onClick={onToggleLyrics}>
            <p className="song-control-menu-item-text">{isExpanded ? 'Hidden' : 'Show'}</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="song-control-menu-item-icon"
            >
              <path d={isExpanded ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
            </svg>
          </div>
          <div className="song-control-menu-item song-control-menu-item-remove song-control-menu-item-divider" onClick={onDelete}>
            <p className="song-control-menu-item-text">Remove</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="song-control-menu-item-icon"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
          <div className="song-control-menu-item song-control-menu-item-cancel" onClick={() => setIsMenuVisible(false)}>
            <p className="song-control-menu-item-text">Cancel</p>
          </div>
        </div>
      </div>
      <div className={`lyrics-container ${isExpanded ? '' : 'hidden'}`}>
        <pre>{lyrics}</pre>
      </div>
      <div className={`gradient-overlay ${isExpanded ? '' : 'hidden'}`}></div>
    </div>
  );
};

export default SongCard; 