import { useContext } from "react"
import {RecipeContext} from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";


const Recipes = () => {
  const { data } = useContext(RecipeContext);


  const renderrecipes = data.map((recipe) => (

    <RecipeCard key={recipe.id} recipe={recipe}/>

  ));
  return (
     <div className="flex flex-wrap">
      {data.length > 0 ? renderrecipes: "No recipes found!"}</div>
  );
   
  
};

export default Recipes;