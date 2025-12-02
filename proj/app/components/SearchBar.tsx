// src/components/SearchBar.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMeals } from "~/redux/mealsSlice";
import type { AppDispatch } from "~/redux/store";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 rounded"
        placeholder="Pesquisar refeição..."
      />
      <button
        onClick={() => {
          if (query.trim()) dispatch(searchMeals(query.trim()));
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Pesquisar
      </button>
    </div>
  );
}
