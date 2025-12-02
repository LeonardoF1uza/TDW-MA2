// src/components/MealModal.tsx
import { useDispatch } from "react-redux";
import { closeModal } from "~/redux/mealsSlice";
import type { AppDispatch } from "~/redux/store";

export default function MealModal({ meal }: { meal: any }) {
  const dispatch = useDispatch<AppDispatch>();
  if (!meal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded max-w-xl w-full">
        <button className="mb-4" onClick={() => dispatch(closeModal())}>Fechar</button>
        <h2 className="text-xl font-bold">{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full mt-2" />
        <p className="mt-4">{meal.strInstructions}</p>
      </div>
    </div>
  );
}
