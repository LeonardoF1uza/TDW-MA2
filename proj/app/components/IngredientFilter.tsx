// app/components/filters/IngredientFilter.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByIngredients, getAllIngredients } from "~/redux/mealsSlice";
import type { AppDispatch, RootState } from "~/redux/store";


export default function IngredientFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector((s: RootState) => s.meals.ingredients);
  const [selected, setSelected] = useState<string[]>([]);
  const [mode, setMode] = useState<"AND" | "OR">("AND");

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const addIngredient = (value?: string) => {
    if (!value) return;
    if (!selected.includes(value)) setSelected((s) => [...s, value]);
  };

  const removeIngredient = (ing: string) =>
    setSelected((s) => s.filter((i) => i !== ing));

  const applyFilter = () => {
    dispatch(filterByIngredients({ ingredients: selected, mode }));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select
          className="border rounded px-3 py-2"
          onChange={(e) => {
            addIngredient(e.target.value);
            e.currentTarget.value = "";
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Escolhe um ingrediente...
          </option>
          {ingredients.map((ing) => (
            <option key={ing} value={ing}>
              {ing}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          onChange={(e) => setMode(e.target.value as "AND" | "OR")}
          value={mode}
        >
          <option value="AND">AND (todos)</option>
          <option value="OR">OR (qualquer)</option>
        </select>

        <button
          onClick={applyFilter}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {selected.map((ing) => (
          <span
            key={ing}
            className="px-2 py-1 rounded bg-gray-100 border flex items-center gap-2"
          >
            {ing}
            <button
              className="text-sm text-red-600"
              onClick={() => removeIngredient(ing)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
