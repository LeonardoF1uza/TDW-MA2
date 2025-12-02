// src/components/MealCard.tsx
import type { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MealCard({ meal }: { meal: any }) {
    return (
        <Link
            key={meal.idMeal}
            to={`/meal/${meal.idMeal}`}
        >
            <div style={Style.card}>
                <img src={meal.strMealThumb} alt={meal.strMeal} style={Style.img} />
                <p style={Style.name}>{meal.strMeal}</p>
            </div>
        </Link >
    );
}

const Style: Record<string, CSSProperties> = {
    img: { width: "100%", borderRadius: "8px" },
    card: {
        textDecoration: "none",
        color: "black",
        border: "1px solid #000",
        padding: "1rem",
        borderRadius: "8px",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: '8px',
    },
    name: {
        marginTop: "0.5rem",
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "bold",
    },
};
