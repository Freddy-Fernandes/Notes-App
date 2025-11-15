import React from "react";

export default function Sidebar({ categories, active, setActive, onCreate }) {
  return (
    <div className="w-64 bg-white rounded-lg shadow p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">Categories</h2>
        <button onClick={onCreate} className="text-sm bg-blue-500 text-white px-3 py-1 rounded">New</button>
      </div>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => setActive(cat)}
              className={`w-full text-left px-3 py-2 rounded ${active === cat ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"}`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-sm text-gray-500">Tip: use New to add a note</div>
    </div>
  );
}
