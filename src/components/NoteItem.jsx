import React from "react";

function NoteItem({ note, index, darkMode, onEdit, onDelete }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    const getTagStyle = (tag) => {
      switch(tag) {
        case "Work": 
          return darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
        case "Personal": 
          return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
        case "Health": 
          return darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
        case "Learning": 
          return darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
        default: 
          return darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800';
      }
    };
  
    return (
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTagStyle(note.tag)}`}>
            {note.tag}
          </span>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {note.date ? formatDate(note.date) : "No date"}
          </span>
        </div>
        <p className={`mb-3 whitespace-pre-wrap ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          {note.text}
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(index)}
            className={`px-3 py-1 text-xs font-medium rounded-md ${
              darkMode 
                ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            } transition-colors`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(index)}
            className={`px-3 py-1 text-xs font-medium rounded-md ${
              darkMode 
                ? 'bg-red-900 text-red-200 hover:bg-red-800' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            } transition-colors`}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default NoteItem;