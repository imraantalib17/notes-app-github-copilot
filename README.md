# 📝 Notes App GitHub Copilot

A modern, feature-rich notes application built with **React**, **Node.js**, and **SQLite**.

## ✨ Features

- **✏️ Rich Text Formatting** - Bold, italic, underline, code blocks, bullet lists, ordered lists, and more
- **📝 Create/Modify/Delete** - Full CRUD operations for managing your notes
- **🔀 Duplicate Notes** - Quickly duplicate any note with one click
- **📋 Copy to Clipboard** - Copy entire note content instantly
- **🔍 Real-time Search** - Search by title or content
- **🏷️ Tags** - Organize notes with custom tags
- **🌙 Dark Mode** - Toggle between light and dark themes with persistent preference
- **💾 Auto-save** - Changes automatically save after 1 second of inactivity
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ 
- npm

### Installation

```bash
# Install all dependencies
npm run install-all
```

### Development

```bash
# Start both server and client with hot reload
npm run dev
```

The app will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📁 Project Structure

```
notes-app-github-copilot/
├── server/                           # Express backend
│   ├── index.js                     # Express server & API routes
│   ├── database.js                  # SQLite database initialization
│   └── package.json
│
├── client/                           # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteEditor.js        # Rich text editor component
│   │   │   ├── NotesList.js         # Notes list display
│   │   │   └── SearchBar.js         # Search functionality
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # App styling with themes
│   │   └── index.js                 # React entry point
│   └── package.json
│
├── README.md                         # This file
├── SETUP.md                          # Detailed setup guide
└── package.json                      # Root package.json
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Quill, React Icons, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite |
| **Styling** | CSS3 with light/dark mode support |
| **Build Tools** | Create React App, npm, concurrently |

## 💻 Using with GitHub Codespaces

This app runs perfectly in GitHub Codespaces:

1. Click **Code** → **Codespaces** → **Create codespace on initial-setup**
2. In the terminal: `npm run install-all`
3. Run: `npm run dev`
4. Forward port 3000 to access the app

## 📝 License

MIT © imraantalib17

## 👨‍💻 Built with GitHub Copilot

This entire project was built with the assistance of **GitHub Copilot**! 🤖
