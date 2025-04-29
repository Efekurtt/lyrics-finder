import React, { useState } from 'react';

interface SearchFormProps {
  onSubmit: (artist: string, song: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artistWarning, setArtistWarning] = useState(false);
  const [songWarning, setSongWarning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!artist || !song) {
      if (!artist) setArtistWarning(true);
      if (!song) setSongWarning(true);
      return;
    }

    const cleanedArtist = artist.trim().toLowerCase();
    const cleanedSong = song.trim().toLowerCase();

    setIsLoading(true);
    try {
      await onSubmit(cleanedArtist, cleanedSong);
      setArtist('');
      setSong('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value);
    if (e.target.value.trim()) setArtistWarning(false);
  };

  const handleSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong(e.target.value);
    if (e.target.value.trim()) setSongWarning(false);
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-warning" style={{ visibility: artistWarning ? 'visible' : 'hidden' }}>
            <span className="iconify warning-icon" data-icon="ri:alert-fill"></span>
            <p>Please Input Your Artist Name!</p>
          </div>
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={handleArtistChange}
          />
        </div>
        <div className="form-group">
          <div className="form-warning" style={{ visibility: songWarning ? 'visible' : 'hidden' }}>
            <span className="iconify warning-icon" data-icon="ri:alert-fill"></span>
            <p>Please Input Your Song Title!</p>
          </div>
          <input
            type="text"
            placeholder="Song Title"
            value={song}
            onChange={handleSongChange}
          />
        </div>
        <button className={`search-button ${isLoading ? 'loading' : ''}`} type="submit">
          <p className="mobile-text">Find Lyrics</p>
          <span className="iconify search-icon" data-icon="material-symbols:search" style={{ color: '#E6E6E6', fontSize: '40px' }}></span>
          <div className="loading-spinner"></div>
        </button>
      </form>
    </section>
  );
};

export default SearchForm; 