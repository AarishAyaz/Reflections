import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [selectedTag, setSelectedTag] = useState("Personal");
  const [filterTag, setFilterTag] = useState("All");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const availableTags = ["Work", "Personal", "Health", "Learning", "Other"];

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    
    try {
      const storedNotes = JSON.parse(localStorage.getItem("diaryNotes"));
      if (storedNotes && Array.isArray(storedNotes)) {
        setNotes(storedNotes);
      }
    } catch (err) {
      console.error("Error loading notes from localStorage:", err);
      setError("Unable to load saved notes. Starting with empty list.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("diaryNotes", JSON.stringify(notes));
    } catch (err) {
      console.error("Error saving notes to localStorage:", err);
      setError("Unable to save notes to local storage.");
    }
  }, [notes]);

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

    if (isEditing && currentNoteIndex !== null) {
      setNotes((prevNotes) =>
        prevNotes.map((note, index) => 
          index === currentNoteIndex ? {...note, ...newNote} : note
        )
      );
      setIsEditing(false);
      setCurrentNoteIndex(null);
    } else {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    setNoteInput("");
    setError("");
  };

  const handleEditNote = (index) => {
    const noteToEdit = notes[index];
    setNoteInput(noteToEdit.text);
    setSelectedTag(noteToEdit.tag);
    setIsEditing(true);
    setCurrentNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    
    if (currentNoteIndex === index) {
      setIsEditing(false);
      setCurrentNoteIndex(null);
      setNoteInput("");
    }
  };

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

  const getFilteredAndSearchedNotes = () => {
    let filteredNotes = notes;
    
    if (filterTag !== "All") {
      filteredNotes = filteredNotes.filter(note => note.tag === filterTag);
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredNotes = filteredNotes.filter(note => 
        note.text.toLowerCase().includes(query) || 
        note.tag.toLowerCase().includes(query)
      );
    }
    
    return [...filteredNotes].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto p-6">
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

        {error && (
          <div className={`${darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-400'} border text-red-600 px-4 py-3 rounded-lg mb-6 relative transition-all duration-300 shadow-md`}>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6 rounded-xl shadow-lg mb-8 transition-all duration-300`}>
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
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentNoteIndex(null);
                    setNoteInput("");
                    setSelectedTag("Personal");
                  }}
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

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6 rounded-xl shadow-lg transition-all duration-300`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Your Notes
              {getFilteredAndSearchedNotes().length > 0 && 
                <span className="ml-2 text-sm font-normal text-gray-500">({getFilteredAndSearchedNotes().length})</span>
              }
            </h2>
            
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
          </div>

          {getFilteredAndSearchedNotes().length > 0 ? (
            <div className="space-y-4">
              {getFilteredAndSearchedNotes().map((note, index) => {
                const actualIndex = notes.findIndex(n => n === note);
                return (
                  <div 
                    key={index} 
                    className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        note.tag === "Work" ? `${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}` :
                        note.tag === "Personal" ? `${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}` :
                        note.tag === "Health" ? `${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}` :
                        note.tag === "Learning" ? `${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}` :
                        `${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'}`
                      }`}>
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
                        onClick={() => handleEditNote(actualIndex)}
                        className={`px-3 py-1 text-xs font-medium rounded-md ${
                          darkMode 
                            ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        } transition-colors`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(actualIndex)}
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
              })}
            </div>
          ) : (
            <div className={`text-center py-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {notes.length > 0 
                  ? "No matching notes found" 
                  : "No notes yet"}
              </h3>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {notes.length > 0 
                  ? "Try adjusting your search or filter criteria." 
                  : "Get started by adding your first note above."}
              </p>
            </div>
          )}
          
          {getFilteredAndSearchedNotes().length > 5 && (
            <div className="mt-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing {getFilteredAndSearchedNotes().length} notes
              </p>
            </div>
          )}
        </div>
        
        <footer className="mt-8 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Reflections Journal © {new Date().getFullYear()} | Your Digital Diary
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;