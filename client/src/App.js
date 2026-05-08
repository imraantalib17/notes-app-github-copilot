import React, { useState, useEffect } from 'react';
import {
  FiPlus,
  FiMoon,
  FiSun,
} from 'react-icons/fi';
import axios from 'axios';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/notes');
      setNotes(response.data);
      setFilteredNotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewNote = () => {
    setSelectedNoteId(null);
  };

  const handleSelectNote = (noteId) => {
    setSelectedNoteId(noteId);
  };

  const handleBack = () => {
    setSelectedNoteId(null);
    loadNotes();
  };

  const handleSearch = (results) => {
    setFilteredNotes(results);
  };

  const handleSearchClear = () => {
    setFilteredNotes(notes);
  };

  const handleNoteSaved = () => {
    loadNotes();
  };

  const handleNoteDeleted = () => {
    setSelectedNoteId(null);
    loadNotes();
  };

  if (selectedNoteId === null && selectedNoteId !== undefined) {
    return (
      <div className="app">
        <NoteEditor
          noteId={null}
          onBack={handleBack}
          onSaved={handleNoteSaved}
          onDeleted={handleNoteDeleted}
        />
      </div>
    );
  }

  if (selectedNoteId) {
    return (
      <div className="app">
        <NoteEditor
          noteId={selectedNoteId}
          onBack={handleBack}
          onSaved={handleNoteSaved}
          onDeleted={handleNoteDeleted}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Notes</h1>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={handleNewNote}
            title="Create new note"
          >
            <FiPlus size={20} />
            New Note
          </button>
          <button
            className="btn-icon-header"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle dark mode"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </header>

      <SearchBar onSearch={handleSearch} onClear={handleSearchClear} />

      <main className="app-main">
        {isLoading ? (
          <div className="loading">Loading notes...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredNotes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Create one to get started!</p>
          </div>
        ) : (
          <NotesList
            notes={filteredNotes}
            onSelectNote={handleSelectNote}
            onRefresh={loadNotes}
          />
        )}
      </main>
    </div>
  );
}

export default App;
