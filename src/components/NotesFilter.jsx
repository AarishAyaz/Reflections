import React from "react";

function NotesFilter({ darkMode, searchQuery, setSearchQuery, filterTag, setFilterTag, availableTags }) {
    return (
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                : 'bg-gray-50 border-gray-300 focus:ring-blue-500'
            } transition-colors`}
          />
          <div className="absolute left-3 top-2.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <select
            id="filterTag"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className={`w-full appearance-none border px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                : 'bg-gray-50 border-gray-300 focus:ring-blue-500'
            } transition-colors`}
          >
            <option value="All">All Categories</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotesFilter;