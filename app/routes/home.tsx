import NavButtons from "../components/NavButtons";
import { Link } from "react-router";
import { useState, type CSSProperties } from "react";
import MealsGrid from "~/components/MealsGrid";
import SearchBar from "~/components/SearchBar";

export default function Home() {
  const [meals, setMeals] = useState([]);

  return (
    <div style={Style.container}>
      <NavButtons />

      <h1>Explora Receitas do Mundo</h1>

      <SearchBar onResults={(meals: any) => setMeals(meals)} />

      <section style={Style.section}>
        <MealsGrid meals={meals} />
      </section>
    </div>
  );
}

const Style: Record<string, CSSProperties> = {
  container: {justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" },
  section: { width: '70%', justifyContent: "center", alignItems: "center",}

};