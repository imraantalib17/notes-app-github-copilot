# 📝 Notes App - GitHub Copilot

A modern, feature-rich notes application with rich text formatting, built with React and Node.js.

## ✨ Features

- **Rich Text Editing** - Bold, italic, underline, code blocks, lists, links, images, and more
- **Create, Edit, Delete** - Full CRUD note management
- **Duplicate Notes** - One-click duplication of any note
- **Copy to Clipboard** - One-click copy of entire note content
- **Real-time Search** - Search by title or content instantly
- **Tags** - Organize notes with custom tags
- **Dark Mode** - Toggle between light and dark themes
- **Auto-save** - Automatic saving as you type (1 second delay)
- **Responsive Design** - Works perfectly on desktop and mobile

## 🏗️ Tech Stack

- **Frontend**: React 18, React Quill (rich text editor), React Icons, Custom CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Build Tool**: npm

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install all dependencies for root, server, and client
npm run install-all
```

### Development

```bash
# Start both frontend and backend servers with hot reload
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Production Build

```bash
# Create production build
npm run build
```

## 📁 Project Structure

```
notes-app-github-copilot/
├── server/                      # Express backend
│   ├── database.js              # SQLite database setup
│   ├── index.js                 # Express server entry point
│   ├── package.json             # Server dependencies
│   └── notes.db                 # SQLite database file (auto-created)
│
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── NoteEditor.js    # Rich text editor
│   │   │   ├── NotesList.js     # Notes list display
│   │   │   └── SearchBar.js     # Search functionality
│   │   ├── App.js               # Main app component
│   │   ├── App.css              # App styles
│   │   └── index.js             # React entry point
│   ├── public/
│   │   └── index.html           # HTML template
│   └── package.json             # Client dependencies
│
└── package.json                 # Root package config
```

## 📖 API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `POST /api/notes/:id/duplicate` - Duplicate note
- `GET /api/search?q=query` - Search notes

## 💡 Usage Guide

### Creating a Note
1. Click "New Note"
2. Enter title and content
3. Add tags (comma-separated, optional)
4. Changes auto-save after 1 second

### Formatting Text
- Use toolbar for **Bold**, *Italic*, `Code`, Lists
- Add links, images, and colors
- Support for code blocks with syntax highlighting

### Duplicating & Copying
- Click duplicate icon to create a copy
- Click copy icon to copy content to clipboard

### Searching
- Use search bar for real-time filtering
- Searches title, content, and tags

### Dark Mode
- Toggle theme in top right corner
- Preference is saved automatically

## 🔧 Configuration

### Change Port Numbers

**Backend** - Edit `server/index.js`:
```javascript
const PORT = process.env.PORT || 5000;
```

**Frontend** - Edit `client/package.json`:
```json
"start": "PORT=3000 react-scripts start"
```

### Reset Database
```bash
rm server/notes.db
# Restart server - it will recreate the database
```

## 📱 GitHub Codespaces

Works perfectly in GitHub Codespaces:

1. Click "Code" → "Codespaces" → "Create codespace on initial-setup"
2. Run: `npm run install-all`
3. Run: `npm run dev`
4. Forward port 3000 to access the app

## 🐛 Troubleshooting

### Port Already in Use
Change the port in the configuration (see above) and restart

### Database Issues
Delete `server/notes.db` and restart the server

### Dependencies Not Installing
```bash
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

## 📄 License

MIT License © imraantalib17

## 👨‍💻 Built with GitHub Copilot

This entire project was created with GitHub Copilot! 🤖
