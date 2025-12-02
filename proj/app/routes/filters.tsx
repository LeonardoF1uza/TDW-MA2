// src/routes/home.tsx
import SearchBar from "../components/SearchBar";
import NavButtons from "../components/NavButtons";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import MealsGrid from "~/components/MealsGrid";
import IngredientFilter from "~/components/IngredientFilter";
import Pagination from "~/components/Pagination";

export default function FiltersPage() {
  const meals = useSelector((s: RootState) => s.meals.meals);

  return (
    <div style={{ padding: "2rem", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      <NavButtons />
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Meals App</h1>
      </header>

      <IngredientFilter />
      <section className="mt-6">
        <MealsGrid meals={meals} />
      </section>

    </div>
  );
}
