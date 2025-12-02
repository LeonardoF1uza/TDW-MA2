// src/components/MealsGrid.tsx
import { useState } from "react";
import MealCard from "./MealCard";
import Pagination from "./Pagination";

export default function MealsGrid({ meals }: { meals: any[] }) {
    if (!meals || meals.length === 0) return <p>Nenhuma refeição encontrada.</p>;

    const [page, setPage] = useState(1);
    const perPage = 6;

    // Cálculo da paginação
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedMeals = meals.slice(start, end);

    return (
        <div style={{ marginTop: "2rem" }}>
            <div className="meals-grid">
                {paginatedMeals.map((m) => (
                    <MealCard key={m.idMeal} meal={m} />
                ))}
            </div>

            <Pagination
                page={page}
                setPage={setPage}
                total={meals.length}   // total correto
                perPage={perPage}
            />
        </div>
    );
}

/* ======== STYLES ======== */
const styles = `
.meals-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .meals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .meals-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
`;

// Injeta estilos no documento quando o componente é importado
if (typeof document !== "undefined") {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
}
