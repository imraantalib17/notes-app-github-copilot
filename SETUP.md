# Notes App - Development Setup

## Prerequisites

- Node.js (v14+)
- npm

## Installation

### Root Level

```bash
# Install root dependencies
npm install

# Install all dependencies (root + client + server)
npm run install-all
```

### Manual Setup (if needed)

```bash
# Server
cd server
npm install
cd ..

# Client
cd client
npm install
cd ..
```

## Running the Application

### Development Mode (Both servers)

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Running Individually

```bash
# Start only the server
npm run server

# In another terminal, start only the client
npm run client
```

## Features

✨ **Rich Text Editing** - Bold, italic, lists, code blocks  
📝 **CRUD Operations** - Create, read, update, delete notes  
🔀 **Duplicate Notes** - One-click duplication  
📋 **Copy Notes** - Copy entire note to clipboard  
🔍 **Search** - Real-time search functionality  
🏷️ **Tags** - Organize notes with tags  
🌙 **Dark Mode** - Toggle theme preference  
💾 **Auto-save** - Automatic saving  

## Project Structure

```
├── server/
│   ├── package.json
│   ├── database.js      # SQLite setup
│   ├── routes.js        # API endpoints
│   └── index.js         # Server entry point
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteEditor.js
│   │   │   ├── NotesList.js
│   │   │   └── SearchBar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── package.json
```

## API Endpoints

### Notes

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `POST /api/notes/:id/duplicate` - Duplicate note
- `GET /api/search?q=query` - Search notes

## Troubleshooting

### Port Already in Use

If ports 3000 or 5000 are already in use, you can change them:

**Server** (in `server/index.js`):
```javascript
const PORT = process.env.PORT || 5001; // Change 5000 to 5001
```

**Client** (in `client/package.json`):
```json
"start": "PORT=3001 react-scripts start"
```

### Database Issues

Delete the `server/notes.db` file to reset the database:

```bash
rm server/notes.db
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `client/build` directory.

## Technologies Used

- **Frontend**: React 18, React Quill, React Icons, Axios
- **Backend**: Node.js, Express, SQLite
- **Styling**: CSS3 with light/dark mode support
- **Tools**: npm, concurrently

## Notes

- All notes are persisted in SQLite database
- Auto-save triggers after 1 second of inactivity
- Theme preference is saved in browser local storage
- Search is performed on title, content, and tags
