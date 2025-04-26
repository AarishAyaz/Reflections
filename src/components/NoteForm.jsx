import React from "react";
import { useState, useEffect } from "react";

function NoteForm({ darkMode, isEditing, currentNote, availableTags, onAddNote, onUpdateNote, onCancelEdit }) {
  const [noteInput, setNoteInput] = useState("");
  const [selectedTag, setSelectedTag] = useState("Personal");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && currentNote) {
      setNoteInput(currentNote.text);
      setSelectedTag(currentNote.tag);
    } else {
      setNoteInput("");
      setSelectedTag("Personal");
    }
  }, [isEditing, currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (noteInput.trim() === "") {
      setError("Note cannot be empty");
      return;
    }
    
    const newNote = {
      text: noteInput,
      tag: selectedTag,
      date: new Date().toISOString()
    };

    if (isEditing) {
      onUpdateNote(newNote);
    } else {
      onAddNote(newNote);
    }

    setNoteInput("");
    setSelectedTag("Personal");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6 rounded-xl shadow-lg mb-8 transition-all duration-300`}>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="note" className={`block font-medium mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
          {isEditing ? "Edit your note:" : "What's on your mind today?"}
        </label>
        <textarea
          id="note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          name="note"
          rows="4"
          className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
              : 'bg-gray-50 border-gray-300 focus:ring-blue-500'
          } transition-colors`}
          placeholder="Type your thoughts here..."
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-fit">
          <label htmlFor="tag" className={`block font-medium mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            Category:
          </label>
          <div className="relative">
            <select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={`w-full appearance-none border px-4 py-3 pr-8 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'bg-gray-50 border-gray-300 focus:ring-blue-500'
              } transition-colors`}
            >
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

        <div className="flex items-end space-x-2">
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg text-white font-medium shadow-md ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-all`}
          >
            {isEditing ? "Update" : "Save"}
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className={`px-6 py-3 rounded-lg font-medium shadow-md ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } transition-all`}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default NoteForm;