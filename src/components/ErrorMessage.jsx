import React from "react";


function ErrorMessage({ message, darkMode }) {
    return (
      <div className={`${darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-400'} border text-red-600 px-4 py-3 rounded-lg mb-6 relative transition-all duration-300 shadow-md`}>
        <span className="block sm:inline">{message}</span>
      </div>
    );
  }
  
  export default ErrorMessage;