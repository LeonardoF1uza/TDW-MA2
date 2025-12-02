import { useEffect, useState, type CSSProperties } from "react";
import { useParams } from "react-router-dom";
import NavButtons from "~/components/NavButtons";

function getIngredients(meal: any) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${ing} - ${measure}`);
  }
  return ingredients;
}

export default function Meal() {
  const { id } = useParams();
  const [meal, setMeal] = useState<any>(null);

  const ingredients: string[] = meal ? getIngredients(meal) : [];


  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p style={{ padding: "2rem" }}>A carregar...</p>;

  return (
    <div style={Style.page}>
      <NavButtons />
      <div style={Style.container}>
        <h1>{meal.strMeal}</h1>
        <div style={Style.content}>

          <div style={Style.rightSection}>
            <h3>Categoria: {meal.strCategory}</h3>
            <h3>Cozinha: {meal.strArea}</h3>

            <div style={Style.containerIngredients}>
              {ingredients.map((element, index) => (
                <div style={Style.ingredient} key={index}>{element}</div>
              ))}
            </div>


            <p style={{ maxWidth: "600px", marginTop: "1rem" }}>
              {meal.strInstructions.replace(/(STEP\s[0-9]+)/g, '<br/><br/>')}
            </p>
          </div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{ width: "20%", borderRadius: "10px" }}
          />
        </div>

        {meal.strYoutube && (
          <button
            style={Style.youtubeButton}
            onClick={() => window.open(meal.strYoutube)}
          >
            Ver Vídeo no YouTube
          </button>
        )}
      </div>
    </div>
  );
}

const Style: Record<string, CSSProperties> = {
  page: { justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" },
  container: { justifyContent: "center", alignItems: "center", display: "flex", width: "80%", flexDirection: "column" },
  content: { justifyContent: "center", gap: "30px", alignItems: "center", display: "flex", width: "100%", flexDirection: "row" },
  section: { width: '70%', justifyContent: "center", alignItems: "center", },
  rightSection: { maxWidth: '50%', justifyContent: "start", alignItems: "center", },
  youtubeButton: { padding: "0.5rem", cursor: "pointer", borderRadius: "50px", width: "300px", fontWeight: "bold", color: "white", backgroundColor: "#FF0000", border: "none", marginTop: "20px" },
  ingredient: { padding: "10px", paddingTop: "5px", paddingBottom: "5px", border: "1px solid black", gap: '10px', cursor: "pointer", borderRadius: "50px" },
  containerIngredients: { display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "start", alignItems: "center" },

};