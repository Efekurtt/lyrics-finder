import React, { useEffect } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  useEffect(() => {
    const text = "LYRSIC • FINDER • ";
    const rotatingText = document.querySelector('.rotating-text');
    if (rotatingText) {
      rotatingText.innerHTML = text.split('').map(
        (char, i) => `<span style="transform:rotate(${i * (360 / text.length)}deg)">${char}</span>`
      ).join('');
    }
  }, []);

  return (
    <nav className="main-navbar">
      <div className="logo-container">
        <div className="logo-text-wrapper">
          <p className="rotating-text"></p>
        </div>
        <span className="iconify logo-icon" data-icon="token:music"></span>
      </div>
      <div className="nav-info">
        <p className="nav-text">Made With By <a href="https://github.com/Efekurtt">Efekurtt</a></p>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true" 
          role="img" 
          width="1em" 
          height="1em" 
          viewBox="0 0 24 24" 
          data-icon="proicons:dark-theme" 
          className="iconify nav-icon iconify--proicons"
          onClick={toggleDarkMode}
        >
          <g fill="none">
            <path fill="currentColor" d="M2.75 12A9.25 9.25 0 0 0 12 21.25V2.75A9.25 9.25 0 0 0 2.75 12"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21.25a9.25 9.25 0 0 0 0-18.5m0 18.5a9.25 9.25 0 0 1 0-18.5m0 18.5V2.75"></path>
          </g>
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;