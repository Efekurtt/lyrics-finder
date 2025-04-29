import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import SongCard from './components/SongCard';
import Alert from './components/Alert';

interface Song {
  artist: string;
  title: string;
  lyrics: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [showAlert, setShowAlert] = useState({ type: '', message: '', visible: false });
  const [expandedSongIndex, setExpandedSongIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    const savedSongsData = JSON.parse(localStorage.getItem('savedSongs') || '[]');
    setSavedSongs(savedSongsData);
  }, []);

  useEffect(() => {
    if (showAlert.visible) {
      const timer = setTimeout(() => {
        setShowAlert(prev => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert.visible]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const overlay = document.querySelector('.theme-transition-overlay');
    overlay?.classList.add('active');

    setTimeout(() => {
      setDarkMode(!darkMode);
      localStorage.setItem('darkMode', (!darkMode).toString());
      
      setTimeout(() => {
        overlay?.classList.remove('active');
        setIsTransitioning(false);
      }, 600);
    }, 400);
  };

  const findExistingSong = (artist: string, title: string) => {
    return savedSongs.findIndex(
      song => song.artist.toLowerCase() === artist.toLowerCase() && 
             song.title.toLowerCase() === title.toLowerCase()
    );
  };

  const moveSongToTop = (index: number) => {
    setSavedSongs(prevSongs => {
      const song = prevSongs[index];
      const newSongs = [...prevSongs];
      newSongs.splice(index, 1);
      newSongs.unshift(song);
      localStorage.setItem('savedSongs', JSON.stringify(newSongs));
      return newSongs;
    });
    setExpandedSongIndex(0);
  };

  const handleSearch = async (artist: string, song: string) => {
    try {
      const existingSongIndex = findExistingSong(artist, song);
      if (existingSongIndex !== -1) {
        moveSongToTop(existingSongIndex);
        setShowAlert({ 
          type: 'warning', 
          message: 'This song is already in your list! Moved to top.', 
          visible: true 
        });
        return;
      }

      const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
      const data = await response.json();

      if (data.lyrics) {
        const newSong = { artist, title: song, lyrics: data.lyrics };
        setSavedSongs(prevSongs => {
          const updatedSongs = [newSong, ...prevSongs];
          localStorage.setItem('savedSongs', JSON.stringify(updatedSongs));
          return updatedSongs;
        });
        setExpandedSongIndex(0);
        setShowAlert({ type: 'success', message: 'Added Song Lyrics', visible: true });
      } else {
        setShowAlert({ type: 'error', message: 'Lyrics not found.', visible: true });
      }
    } catch (error) {
      setShowAlert({ type: 'error', message: 'Lyrics not found.', visible: true });
    }
  };

  const handleDeleteSong = (index: number) => {
    setSavedSongs(prevSongs => {
      const updatedSongs = prevSongs.filter((_, i) => i !== index);
      localStorage.setItem('savedSongs', JSON.stringify(updatedSongs));
      return updatedSongs;
    });
    if (expandedSongIndex === index) {
      setExpandedSongIndex(null);
    } else if (expandedSongIndex !== null && expandedSongIndex > index) {
      setExpandedSongIndex(expandedSongIndex - 1);
    }
  };

  const handleToggleLyrics = (index: number) => {
    setExpandedSongIndex(expandedSongIndex === index ? null : index);
  };

  return (
    <>
      <div className="theme-transition-overlay">
        <div className="theme-transition-circle"></div>
      </div>
      <div className="main-container">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <SearchForm onSubmit={handleSearch} />
        <section className="results-section">
          {savedSongs.map((song, index) => (
            <SongCard
              key={index}
              artist={song.artist}
              title={song.title}
              lyrics={song.lyrics}
              onDelete={() => handleDeleteSong(index)}
              isExpanded={expandedSongIndex === index}
              onToggleLyrics={() => handleToggleLyrics(index)}
            />
          ))}
        </section>
        <div className="dark-mode-mobile-bar" onClick={toggleDarkMode}>
          <span className="iconify dark-mode-icon" data-icon="proicons:dark-theme"></span>
        </div>
        <Alert
          type={showAlert.type as 'success' | 'error' | 'warning'}
          message={showAlert.message}
          visible={showAlert.visible}
        />
      </div>
    </>
  );
}

export default App;
