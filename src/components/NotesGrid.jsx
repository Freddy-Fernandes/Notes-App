import React from "react";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes = [], onEdit, onDelete }) {
  if (!Array.isArray(notes)) notes = [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes available</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => onEdit(note)}
            onDelete={() => onDelete(note.id)}
          />
        ))
      )}
    </div>
  );
}

