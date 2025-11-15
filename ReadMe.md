# Notes App (Evernote-style MVP)

This is a simple responsive notes management app built with React and Tailwind CSS. It supports create, read, update, and delete (CRUD) operations for notes, category filtering, duplicate title handling, and persistence using `localStorage`. Initial notes are loaded from `public/notes.json`.

## Features
- Sidebar with categories and "All Notes"
- Display notes as cards in a responsive grid
- Create and edit notes in a modal
- Delete with confirmation
- Filter notes by category
- Load initial notes from `public/notes.json`
- Persist changes in `localStorage`
- Duplicate title handling by auto-appending (1), (2), etc. in the same category

## Tech stack
- React
- Tailwind CSS
- dayjs for date formatting
- Vite as the dev server and build tool

## Folder structure
