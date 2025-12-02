// src/components/MealCard.tsx
import { Link, useNavigate } from "react-router-dom";

export default function MealCard({ meal }: { meal: any }) {
    const navigate = useNavigate();
    return (
        <Link
            key={meal.idMeal}
            to={`/meal/${meal.idMeal}`}
            style={{
                textDecoration: "none",
                color: "black",
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
            }}
        >
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{meal.strMeal}</h3>
        </Link>
    );
}
