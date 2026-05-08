import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  FiSave,
  FiTrash2,
  FiCopy,
  FiChevronLeft,
  FiAlertCircle,
} from 'react-icons/fi';
import axios from 'axios';
import './NoteEditor.css';

function NoteEditor({ noteId, onBack, onSaved, onDeleted }) {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const saveTimeoutRef = useRef(null);

  // Load note
  useEffect(() => {
    const loadNote = async () => {
      try {
        if (noteId) {
          const response = await axios.get(`/api/notes/${noteId}`);
          setNote(response.data);
          setTitle(response.data.title);
          setContent(response.data.content);
          setTags(response.data.tags || '');
        } else {
          // New note
          setNote(null);
          setTitle('');
          setContent('');
          setTags('');
        }
        setError(null);
      } catch (err) {
        setError('Failed to load note');
        console.error(err);
      }
    };

    loadNote();
  }, [noteId]);

  // Auto-save handler
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus('editing...');

    saveTimeoutRef.current = setTimeout(() => {
      saveNote();
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, content, tags]);

  const saveNote = async () => {
    if (!title.trim()) {
      setSaveStatus('title required');
      return;
    }

    try {
      setIsSaving(true);

      if (note) {
        // Update existing
        await axios.put(`/api/notes/${note.id}`, {
          title: title.trim(),
          content,
          tags,
        });
      } else {
        // Create new
        const response = await axios.post('/api/notes', {
          title: title.trim(),
          content,
          tags,
        });
        setNote(response.data);
      }

      setSaveStatus('saved ✓');
      setTimeout(() => setSaveStatus(''), 2000);
      if (onSaved) onSaved();
    } catch (err) {
      setSaveStatus('save failed');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!note) return;

    if (!window.confirm('Delete this note?')) return;

    try {
      await axios.delete(`/api/notes/${note.id}`);
      if (onDeleted) onDeleted();
      onBack();
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.replace(/<[^>]*>/g, ''));
      setSaveStatus('copied ✓');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setError('Failed to copy');
    }
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  if (error && !note && !noteId) {
    return (
      <div className="note-editor-container">
        <div className="error-state">
          <FiAlertCircle size={48} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="note-editor-container">
      <div className="editor-header">
        <button className="btn-back" onClick={onBack} title="Back to notes">
          <FiChevronLeft size={24} />
        </button>

        <input
          type="text"
          className="editor-title-input"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="editor-actions">
          <span className="save-status">{saveStatus}</span>

          <button
            className="btn-icon"
            onClick={handleCopy}
            title="Copy note content"
          >
            <FiCopy size={20} />
          </button>

          {note && (
            <button
              className="btn-icon btn-danger"
              onClick={handleDelete}
              title="Delete note"
            >
              <FiTrash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="editor-tags">
        <input
          type="text"
          className="tags-input"
          placeholder="Add tags (comma separated)..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="editor-content">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Start typing your note..."
          className="quill-editor"
        />
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default NoteEditor;
