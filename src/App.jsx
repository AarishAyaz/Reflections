import React from "react";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import ErrorMessage from "./components/ErrorMessage";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [error, setError] = useState("");
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setError("");
  };

  const handleUpdateNote = (updatedNote) => {
    if (currentNoteIndex !== null) {
      setNotes((prevNotes) =>
        prevNotes.map((note, index) => 
          index === currentNoteIndex ? {...note, ...updatedNote} : note
        )
      );
      setIsEditing(false);
      setCurrentNoteIndex(null);
    }
  };

  const handleEditNote = (index) => {
    setIsEditing(true);
    setCurrentNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    
    if (currentNoteIndex === index) {
      setIsEditing(false);
      setCurrentNoteIndex(null);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setCurrentNoteIndex(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto p-6">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {error && <ErrorMessage message={error} darkMode={darkMode} />}
        
        <NoteForm 
          darkMode={darkMode}
          isEditing={isEditing}
          currentNote={currentNoteIndex !== null ? notes[currentNoteIndex] : null}
          availableTags={availableTags}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onCancelEdit={cancelEditing}
        />
        
        <NotesList 
          notes={notes}
          darkMode={darkMode}
          availableTags={availableTags}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
        
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;