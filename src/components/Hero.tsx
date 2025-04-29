import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [currentArtist, setCurrentArtist] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const artists = ["Adele", "Beyonce", "Drake", "Anitta"];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = artists[wordIndex];
      
      if (!isDeleting && charIndexRef.current < currentWord.length) {
        setCurrentArtist(currentWord.substring(0, charIndexRef.current + 1));
        charIndexRef.current += 1;
        timeoutRef.current = setTimeout(typeEffect, 200); // Yazma hızı
      } else if (isDeleting && charIndexRef.current > 0) {
        setCurrentArtist(currentWord.substring(0, charIndexRef.current - 1));
        charIndexRef.current -= 1;
        timeoutRef.current = setTimeout(typeEffect, 100); // Silme hızı
      } else {
        if (isDeleting) {
          setWordIndex((prev) => (prev + 1) % artists.length);
          charIndexRef.current = 0;
          setIsDeleting(false);
          timeoutRef.current = setTimeout(typeEffect, 1000); // Kelimeler arası bekleme
        } else {
          setIsDeleting(true);
          timeoutRef.current = setTimeout(typeEffect, 2000); // Kelime tamamlandıktan sonra bekleme
        }
      }
    };

    timeoutRef.current = setTimeout(typeEffect, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDeleting, wordIndex]);

  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Discover the Lyrics of the 
        <br />Songs <br className="mobile-break" />by
        <span className="dynamic-artist">{currentArtist}</span>
        <br />And more
      </h1>
    </section>
  );
};

export default Hero;