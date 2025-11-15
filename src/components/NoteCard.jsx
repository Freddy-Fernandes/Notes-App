import React from "react";

export default function NoteCard({ note, onEdit, onDelete }) {
  if (!note) return null; // prevent crash

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold text-lg">{note.title}</h2>
      <p className="text-gray-600 mt-2">{note.content}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
