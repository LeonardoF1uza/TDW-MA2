// src/redux/mealsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://www.themealdb.com/api/json/v1/1/";

export const searchMeals = createAsyncThunk(
  "meals/searchMeals",
  async (query: string) => {
    const res = await fetch(`${API}search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals ?? [];
  }
);

export const fetchMealDetails = createAsyncThunk(
  "meals/fetchMealDetails",
  async (id: string) => {
    const res = await fetch(`${API}lookup.php?i=${encodeURIComponent(id)}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  }
);

export const fetchByCategory = createAsyncThunk(
  "meals/fetchByCategory",
  async (cat: string) => {
    const res = await fetch(`${API}filter.php?c=${encodeURIComponent(cat)}`);
    const data = await res.json();
    return data.meals ?? [];
  }
);

export const fetchByArea = createAsyncThunk(
  "meals/fetchByArea",
  async (area: string) => {
    const res = await fetch(`${API}filter.php?a=${encodeURIComponent(area)}`);
    const data = await res.json();
    return data.meals ?? [];
  }
);

export const getAllCategories = createAsyncThunk(
  "meals/getAllCategories",
  async () => {
    const res = await fetch(`${API}list.php?c=list`);
    const data = await res.json();
    return (data.meals || []).map((m: any) => m.strCategory);
  }
);

export const getAllAreas = createAsyncThunk("meals/getAllAreas", async () => {
  const res = await fetch(`${API}list.php?a=list`);
  const data = await res.json();
  return (data.meals || []).map((m: any) => m.strArea);
});

export const getAllIngredients = createAsyncThunk(
  "meals/getAllIngredients",
  async () => {
    const res = await fetch(`${API}list.php?i=list`);
    const data = await res.json();
    return (data.meals || []).map((m: any) => m.strIngredient);
  }
);

export const filterByIngredients = createAsyncThunk(
  "meals/filterByIngredients",
  async (payload: { ingredients: string[]; mode?: "AND" | "OR" }) => {
    const { ingredients, mode = "AND" } = payload;
    if (!ingredients || ingredients.length === 0) return [];

    const promises = ingredients.map((ing) =>
      fetch(`${API}filter.php?i=${encodeURIComponent(ing)}`).then((r) =>
        r.json()
      )
    );

    const responses = await Promise.all(promises);

    const lists = responses
      .map((r) => r.meals)
      .filter((m) => Array.isArray(m)) as any[][];

    if (lists.length === 0) return [];

    if (mode === "AND") {
      const combined = lists.reduce((acc, curr) =>
        acc.filter((a) => curr.some((b) => b.idMeal === a.idMeal))
      );
      return combined;
    } else {
      const all = lists.flat();
      const unique = Array.from(new Map(all.map((m) => [m.idMeal, m])).values());
      return unique;
    }
  }
);

type MealsState = {
  meals: any[];
  currentMeal: any | null;
  loading: boolean;
  error: string | null;
  page: number;
  itemsPerPage: number;
  categories: string[];
  areas: string[];
  ingredients: string[];
};

const initialState: MealsState = {
  meals: [],
  currentMeal: null,
  loading: false,
  error: null,
  page: 1,
  itemsPerPage: 6,
  categories: [],
  areas: [],
  ingredients: [],
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    closeModal(state) {
      state.currentMeal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMeals.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(searchMeals.fulfilled, (s, a) => {
        s.meals = a.payload;
        s.loading = false;
        s.page = 1;
      })
      .addCase(searchMeals.rejected, (s) => {
        s.loading = false;
        s.error = "Erro ao pesquisar.";
      })
      .addCase(fetchMealDetails.fulfilled, (s, a) => {
        s.currentMeal = a.payload;
      })
      .addCase(fetchByCategory.fulfilled, (s, a) => {
        s.meals = a.payload;
        s.page = 1;
      })
      .addCase(fetchByArea.fulfilled, (s, a) => {
        s.meals = a.payload;
        s.page = 1;
      })
      .addCase(getAllCategories.fulfilled, (s, a) => {
        s.categories = a.payload;
      })
      .addCase(getAllAreas.fulfilled, (s, a) => {
        s.areas = a.payload;
      })
      .addCase(getAllIngredients.fulfilled, (s, a) => {
        s.ingredients = a.payload;
      })
      .addCase(filterByIngredients.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(filterByIngredients.fulfilled, (s, a) => {
        s.meals = a.payload;
        s.loading = false;
        s.page = 1;
      })
      .addCase(filterByIngredients.rejected, (s) => {
        s.loading = false;
        s.error = "Erro ao filtrar por ingredientes.";
      });
  },
});

export const { setPage, closeModal } = mealsSlice.actions;
export default mealsSlice.reducer;
