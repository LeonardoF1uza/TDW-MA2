import { useState, type CSSProperties } from "react";

export default function SearchBar({ onResults }: { onResults: (meals: any[]) => void }) {
    const [search, setSearch] = useState("");

    const fetchMeals = async () => {
        if (!search.trim()) {
            onResults([]);
            return;
        }

        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        const data = await res.json();

        onResults(data.meals || []);
    };

    return (
        <div style={Style.container}>
            <input
                type="text"
                placeholder="Ex: chicken..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={Style.input}
            />

            <button onClick={fetchMeals} style={Style.button}>Pesquisar</button>
        </div>
    );
}


const Style: Record<string, CSSProperties> = {
    container: { marginBottom: "1rem", gap: "0.5rem", display: "flex", alignItems: "center", justifyContent: "cente" },
    input: { padding: "0.5rem", cursor: "pointer", borderRadius: "50px", width: "300px" },
    button: { backgroundColor: "white", border: "2px solid #000", padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "50px" }
};


