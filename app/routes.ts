import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("meal/:id", "routes/meal.tsx"),
    route("Filters", "routes/filters.tsx"),
] satisfies RouteConfig;