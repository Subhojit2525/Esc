

import { useContext, useEffect, useMemo, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(RecipeContext);
  const navigate = useNavigate();
  const params = useParams();
  const [isFav, setIsFav] = useState(false);

  const recipe = useMemo(
    () => data.find((r) => String(r.id) === String(params.id)),
    [data, params.id]
  );

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe?.title,
        chef: recipe?.chef,
        image: recipe?.image,
        inst: recipe?.inst,
        desc: recipe?.desc,
        ingr: recipe?.ingr,
        category: recipe?.category || "breakfast",
      }); 
    }

    // Check if this recipe is already favorite
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favs.some((f) => String(f.id) === String(params.id)));
  }, [recipe, reset, params.id]);

  const SubmitHandler = (updatedRecipe) => {
    const index = data.findIndex((r) => String(r.id) === String(params.id));
    if (index === -1) return toast.error("Recipe not found!");

    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...updatedRecipe };
    setdata(copydata);
    localStorage.setItem("recipes", JSON.stringify(copydata));
    toast.success("Recipe updated successfully!");
  };

  const DeleteHandler = () => {
    const filterdata = data.filter((r) => String(r.id) !== String(params.id));
    setdata(filterdata);
    localStorage.setItem("recipes", JSON.stringify(filterdata));
    toast.success("Recipe deleted!");
    navigate("/recipes");
  };

  // ❤️ Favorite toggle
  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFav) {
      const newFavs = favs.filter((f) => String(f.id) !== String(recipe.id));
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      toast.info("Removed from favorites 💔");
    } else {
      favs.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favs));
      toast.success("Added to favorites ❤️");
    }
    setIsFav(!isFav);
  };

  if (!recipe) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="w-full flex">
      <div className="relative left w-1/2 p-2">
        <h1 className="text-4xl font-black flex items-center justify-between">
          {recipe.title}
          <button onClick={toggleFavorite}>
            {isFav ? (
              <i className="ri-heart-fill text-red-500 text-3xl"></i>
            ) : (
              <i className="ri-heart-line text-gray-400 text-3xl"></i>
            )}
          </button>
        </h1>
        <img className="h-[30vh] w-full object-cover rounded-lg mt-3" src={recipe.image} alt={recipe.title} />
      </div>

      <form className="w-1/2 p-2" onSubmit={handleSubmit(SubmitHandler)}>
        <input className="block border-b outline-0 p-2" {...register("image")} type="url" placeholder="Enter image Url" />
        <input className="block border-b outline-0 p-2" {...register("title")} type="text" placeholder="Recipe Title" />
        <input className="block border-b outline-0 p-2" {...register("chef")} type="text" placeholder="Chef Name" />
        <textarea className="block border-b outline-0 p-2" {...register("desc")} placeholder="//start from here"></textarea>
        <textarea className="block border-b outline-0 p-2" {...register("ingr")} placeholder="//write ingredients separated by comma"></textarea>
        <textarea className="block border-b outline-0 p-2" {...register("inst")} placeholder="//write instructions separated by comma"></textarea>
        <select className="block border-b outline-0 p-2" {...register("category")}>
          <option className="text-black" value="breakfast">Breakfast</option>
          <option className="text-black" value="lunch">Lunch</option>
          <option className="text-black" value="dinner">Dinner</option>
        </select>

        <button className="mt-5 block bg-blue-900 px-4 py-2 rounded text-white">Update Recipe</button>
        <button type="button" onClick={DeleteHandler} className="mt-5 block bg-red-900 px-4 py-2 rounded text-white">
          Delete Recipe
        </button>
      </form>
    </div>
  );
};

export default SingleRecipe;
