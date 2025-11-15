import React from "react";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return <div className="p-6 bg-white rounded shadow text-center">No notes found</div>;
  }
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onEdit={() => onEdit(note)} onDelete={() => onDelete(note.id)} />
      ))}
    </div>
  );
}
