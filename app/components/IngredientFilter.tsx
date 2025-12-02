// app/components/filters/IngredientFilter.tsx
import React, { useEffect, useState, type CSSProperties } from "react";
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
        <div className="space-y-2" style={Style.container}>
            <div className="flex gap-2" style={Style.containerinputs}>
                <select
                    className="border rounded px-3 py-2"
                    onChange={(e) => {
                        addIngredient(e.target.value);
                        e.currentTarget.value = "";
                    }}
                    defaultValue=""
                    style={Style.input}
                >
                    <option value="" disabled>
                        Escolhe um ingrediente
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
                    style={Style.smalInput}

                >
                    <option value="AND">Todos</option>
                    <option value="OR">Pelo menos um</option>
                </select>

                <button
                    style={Style.button}
                    onClick={applyFilter}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Filtrar
                </button>
            </div>

            <div style={Style.containerIngredients} >
                {selected.map((ing) => (
                    <span
                        style={Style.ingredient}
                        key={ing}
                        className="px-2 py-1 rounded bg-gray-100 border flex items-center gap-2"
                    >
                        {ing}
                        <button
                            style={Style.removeButton}
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

const Style: Record<string, CSSProperties> = {
    container: { display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", justifyContent: "center" },
    containerIngredients: { display: "flex", flexWrap: "wrap", gap: "8px", width: "400px", justifyContent: "start", alignItems: "center" },
    containerinputs: { display: "flex", gap: "8px", },
    input: { padding: "0.5rem", cursor: "pointer", borderRadius: "50px", width: "200px" },
    ingredient: { paddingLeft: "10px", borderRight:"0",gap:'10px', cursor: "pointer", borderRadius: "50px" },
    smalInput: { padding: "0.5rem", cursor: "pointer", borderRadius: "50px", width: "140px" },
    button: { backgroundColor: "white", border: "2px solid #000", padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "50px" },
    removeButton: { backgroundColor: "#e2e8f0", width: "30px", height: "30px", cursor: "pointer", borderRadius: "50px" }
};

