import React from "react";


function Header({ darkMode, toggleDarkMode }) {
    return (
      <header className="mb-8 relative">
        <div className="absolute right-0 top-0">
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            Reflections
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your personal digital journal
          </p>
        </div>
      </header>
    );
  }
  
  export default Header;