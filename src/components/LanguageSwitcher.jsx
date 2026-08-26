import React from 'react';
import './LanguageSwitcher.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिं' },
  { code: 'mr', label: 'मरा' },
];

const LanguageSwitcher = ({ currentLang = 'en', onLangChange }) => {
  return (
    <div className="lang-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
          onClick={() => onLangChange && onLangChange(lang.code)}
          title={lang.code === 'en' ? 'English' : lang.code === 'hi' ? 'Hindi' : 'Marathi'}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
