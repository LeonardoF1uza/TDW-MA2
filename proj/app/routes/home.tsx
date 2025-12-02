import NavButtons from "../components/NavButtons";
import { Link } from "react-router";
import { useState } from "react";

// Nota: O CSS foi migrado para estilos inline, o que é útil para pequenos 
// ajustes, mas para grandes projetos, o CSS em arquivo separado ou módulos é recomendado.

export default function Home() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await res.json();
    setMeals(data.meals || []);
  };

  return (
    <div
    className=""
    style={{ padding: "2rem" }}>
      <NavButtons />

      <h1>Pesquisar Receitas</h1>

      <input
        type="text"
        placeholder="Ex: chicken..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />

      <button onClick={fetchMeals}>Pesquisar</button>

      <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {meals.map((meal) => (
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
        ))}
      </div>
    </div>
  );
}