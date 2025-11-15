import React, { useEffect, useState } from "react";

export default function NoteModal({ note, categories = [], onSave, onClose }) {

  // Safe fallback
  const initialCategory = note?.category || categories[0] || "";

  const [title, setTitle] = useState(note ? note.title : "");
  const [description, setDescription] = useState(note ? note.description : "");
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function submit(e) {
    e.preventDefault();

    const payload = {
      id: note ? note.id : undefined,
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || "Uncategorized"
    };

    onSave(payload);
  }

  return (
    <div className="fixed inset-0 overflow-auto flex items-center justify-center z-50 bg-black/40 p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded p-4 shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{note ? "Edit Note" : "Create Note"}</h2>
          <button type="button" onClick={onClose} className="text-gray-600">
            Close
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 border p-2 rounded"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm">Category</label>

            <input
              list="category-list"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Type or select category"
            />

            <datalist id="category-list">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
