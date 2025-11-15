import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import NotesGrid from "./components/NotesGrid";
import NoteModal from "./components/NoteModal";
import ConfirmDialog from "./components/ConfirmDialog";
import dayjs from "dayjs";

const STORAGE_KEY = "notes-app-data-v1";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState(["All Notes", "Work", "Personal", "Ideas"]);
  const [activeCategory, setActiveCategory] = useState("All Notes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, noteId: null });

  useEffect(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      setNotes(JSON.parse(local));
    } else {
      fetch("/notes.json")
        .then(r => r.json())
        .then(data => {
          setNotes(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    const cats = Array.from(new Set(["All Notes", ...notes.map(n => n.category)]));
    setCategories(cats);
  }, [notes]);

  function openCreate() {
    setEditingNote(null);
    setIsModalOpen(true);
  }

  function saveNote(note) {
    if (!note.title) return;
    if (note.id) {
      setNotes(prev => prev.map(n => n.id === note.id ? { ...note } : n));
    } else {
      const baseId = Date.now();
      const newNote = {
        ...note,
        id: baseId,
        createdAt: dayjs().toISOString()
      };
      setNotes(prev => [...prev, resolveDuplicateTitle(prev, newNote)]);
    }
    setIsModalOpen(false);
  }

  function resolveDuplicateTitle(existingNotes, candidate) {
    const sameCategory = existingNotes.filter(n => n.category === candidate.category);
    const titles = sameCategory.map(n => n.title);
    if (!titles.includes(candidate.title)) return candidate;
    let i = 1;
    let newTitle = `${candidate.title} (${i})`;
    while (titles.includes(newTitle)) {
      i++;
      newTitle = `${candidate.title} (${i})`;
    }
    return { ...candidate, title: newTitle };
  }

  function editNote(note) {
    setEditingNote(note);
    setIsModalOpen(true);
  }

  function askDelete(id) {
    setConfirm({ open: true, noteId: id });
  }

  function doDelete() {
    setNotes(prev => prev.filter(n => n.id !== confirm.noteId));
    setConfirm({ open: false, noteId: null });
  }

  function cancelDelete() {
    setConfirm({ open: false, noteId: null });
  }

  const filtered = activeCategory === "All Notes"
    ? notes.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt))
    : notes.filter(n => n.category === activeCategory).sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-4">
          <Sidebar
            categories={categories}
            active={activeCategory}
            setActive={setActiveCategory}
            onCreate={openCreate}
          />
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Notes</h1>
              <div className="text-sm text-gray-600">Showing {filtered.length} notes</div>
            </div>
            <NotesGrid notes={filtered} onEdit={editNote} onDelete={askDelete} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <NoteModal
          note={editingNote}
          categories={categories.filter(c => c !== "All Notes")}
          onSave={saveNote}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {confirm.open && (
        <ConfirmDialog
          onConfirm={doDelete}
          onCancel={cancelDelete}
          message="Are you sure you want to delete this note?"
        />
      )}
    </div>
  );
}
