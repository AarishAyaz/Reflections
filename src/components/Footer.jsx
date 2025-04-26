import React from "react";

function Footer({ darkMode }) {
    return (
      <footer className="mt-8 text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Reflections Journal © {new Date().getFullYear()} | Your Digital Diary
        </p>
      </footer>
    );
  }
  
  export default Footer;