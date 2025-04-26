import React from "react";

function EmptyNotesList({ darkMode, hasNotes }) {
    return (
      <div className={`text-center py-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          {hasNotes 
            ? "No matching notes found" 
            : "No notes yet"}
        </h3>
        <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {hasNotes 
            ? "Try adjusting your search or filter criteria." 
            : "Get started by adding your first note above."}
        </p>
      </div>
    );
  }
  
  export default EmptyNotesList;