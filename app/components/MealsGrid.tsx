import { useState, type CSSProperties } from "react";
import MealCard from "./MealCard";
import Pagination from "./Pagination";

export default function MealsGrid({ meals }: { meals: any[] }) {
    if (!meals || meals.length === 0) return
    <div style={Style.container}>
        <p>Nenhuma receita encontrada.</p>
    </div>

    const [page, setPage] = useState(1);

    const perPage = 9;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedMeals = meals.slice(start, end);

    return (
        <div style={Style.container}>
            <div style={Style.grid}>
                {paginatedMeals.map((m) => (
                    <div key={m.idMeal} style={Style.cardWrapper}>
                        <MealCard meal={m} />
                    </div>
                ))}
            </div>

            <Pagination
                page={page}
                setPage={setPage}
                total={meals.length}
                perPage={perPage}
            />
        </div>
    );
}

const Style: Record<string, CSSProperties> = {
    container: {
        marginTop: "2rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    grid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
    },

    cardWrapper: {
        gap: "8px",
        maxWidth: "300px",
    },

};
