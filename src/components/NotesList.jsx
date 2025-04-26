import React from "react";
import { useState } from "react";
import NoteItem from "./NoteItem";
import NotesFilter from "./NotesFilter";
import EmptyNotesList from "./EmptyNotesList";

function NotesList({ notes, darkMode, availableTags, onEditNote, onDeleteNote }) {
  const [filterTag, setFilterTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredNotes = getFilteredAndSearchedNotes();

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6 rounded-xl shadow-lg transition-all duration-300`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
          Your Notes
          {filteredNotes.length > 0 && 
            <span className="ml-2 text-sm font-normal text-gray-500">({filteredNotes.length})</span>
          }
        </h2>
        
        <NotesFilter 
          darkMode={darkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          availableTags={availableTags}
        />
      </div>

      {filteredNotes.length > 0 ? (
        <div className="space-y-4">
          {filteredNotes.map((note, index) => {
            const actualIndex = notes.findIndex(n => n === note);
            return (
              <NoteItem 
                key={index}
                note={note}
                index={actualIndex}
                darkMode={darkMode}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
              />
            );
          })}
        </div>
      ) : (
        <EmptyNotesList 
          darkMode={darkMode} 
          hasNotes={notes.length > 0} 
        />
      )}
      
      {filteredNotes.length > 5 && (
        <div className="mt-6 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredNotes.length} notes
          </p>
        </div>
      )}
    </div>
  );
}

export default NotesList;