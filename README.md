# Personal NotesCard App 🚀

A modern note-taking application built with React and best practices for managing personal notes with a clean, responsive interface.

## Key Features ✨

- Create, read, update and delete notes
- Search and filter functionality
- Responsive design
- Dark/Light theme support
- Pagination with optimized loading
- Optimistic UI updates
- Authentication integration

## Tech Stack 🛠️

### Frontend Core
- React 18 with Hooks
- React Router v6 with data loading
- TailwindCSS + ShadcnUI
- Lucide React icons

### Development Tools
- Vite
- ESLint
- JSDoc documentation
- Git version control

## Architecture 🏗️

The project follows a clean, modular architecture:

## Project Structure 📁

```text
src/
├── components/          # UI components like buttons, cards, modals
│   ├── ui/             # Base UI components (buttons, inputs)
│   ├── layout/         # Layout components (header, footer)
│   └── dialogs/        # Modal components
│
├── services/           # API and business logic
│   ├── notes/          # Notes CRUD operations
│   └── login/          # Authentication services
│
├── routes/             # Route components and loaders
│   ├── note.jsx        # Note routes and handlers
│   └── login.jsx       # Auth routes
│
├── context/            # Global state management
│   └── auth/           # Authentication context
│
└── lib/               # Utility functions and helpers
    ├── utils.js       # Common utilities
    └── constants.js   # App constants
```


## Best Practices 💡

- Component-based architecture
- Service layer pattern for API calls
- Global context for state management
- Route-based code splitting
- TypeScript documentation with JSDoc
- Error boundaries
- Loading states and skeletons
- Responsive design patterns
- Optimistic UI updates

## Getting Started 🚀

```bash
# Clone the repository
git clone https://github.com/albertobarrago/notes-card.git

# Navigate to project directory
cd notes-card

# Install dependencies
npm install

# Start development server
npm run dev
```


## TODOs: 
- [ ] Add error handling on note 
