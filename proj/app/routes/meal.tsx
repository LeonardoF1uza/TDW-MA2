import type { RootState } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMealDetails } from "~/redux/mealsSlice";
import type { AppDispatch } from "~/redux/store";

export default function Meal() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p style={{ padding: "2rem" }}>A carregar...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h3>Categoria: {meal.strCategory}</h3>
      <h3>Cozinha: {meal.strArea}</h3>

      <p style={{ maxWidth: "600px", marginTop: "1rem" }}>
        {meal.strInstructions}
      </p>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Vídeo no YouTube
        </a>
      )}
    </div>
  );
}

