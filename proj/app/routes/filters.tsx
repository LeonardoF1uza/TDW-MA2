// src/routes/home.tsx
import NavButtons from "../components/NavButtons";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import MealsGrid from "~/components/MealsGrid";
import IngredientFilter from "~/components/IngredientFilter";
import type { CSSProperties } from "react";

export default function FiltersPage() {
  const meals = useSelector((s: RootState) => s.meals.meals);

  return (
    <div style={Style.container}>
      <NavButtons />
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Explora Receitas do Mundo</h1>
      </header>
      <IngredientFilter />
         <section style={Style.section}>
              <MealsGrid meals={meals} />
            </section>

    </div>
  );
}


const Style: Record<string, CSSProperties> = {
  container: { justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" },
  section: { width: '70%', justifyContent: "center", alignItems: "center",}

};