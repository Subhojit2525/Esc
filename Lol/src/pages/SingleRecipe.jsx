


import { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(RecipeContext);
  const navigate = useNavigate();
  const params = useParams();
  const recipe = data.find((r) => String(r.id) === String(params.id));
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: recipe.title,
      chef: recipe.chef,
      image:  recipe.image,
      inst: recipe.inst,
      desc: recipe.desc,
      ingr: recipe.ingr,

    },
  });

  // जब recipe मिले, तब form में values set करो
  useEffect(() => {
    if (recipe) {
      reset(recipe);
    }
  }, [recipe, reset]);

  const SubmitHandler = (updatedRecipe) => {
    const index = data.findIndex((r) => String(r.id) === String(params.id));
    if (index === -1) return toast.error("Recipe not found!");

    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...updatedRecipe };
    setdata(copydata);
    toast.success("Recipe updated successfully!");
  };

  const DeleteHandler = () => {
    const filterdata = data.filter((r) => String(r.id) !== String(params.id));
    setdata(filterdata);
    toast.success("Recipe deleted!");
    navigate("/recipes");
  };

  if (!recipe) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="w-full flex">
      <div className="left w-1/2 p-2">
        <h1 className="text-4xl font-black">{recipe.title}</h1>
        <img className="h-[20vh]" src={recipe.image} alt={recipe.title} />
      </div>

      <form className="w-1/2 p-2" onSubmit={handleSubmit(SubmitHandler)}>
        <input
          className="block border-b outline-0 p-2"
          {...register("image")}
          type="url"
          placeholder="Enter image Url"
        />
        <input
          className="block border-b outline-0 p-2"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />
        <input
          className="block border-b outline-0 p-2"
          {...register("chef")}
          type="text"
          placeholder="Chef Name"
        />
        <textarea
          className="block border-b outline-0 p-2"
          {...register("desc")}
          placeholder="//start from here"
        ></textarea>
        <textarea
          className="block border-b outline-0 p-2"
          {...register("ingr")}
          placeholder="//write ingredients separated by comma"
        ></textarea>
        <textarea
          className="block border-b outline-0 p-2"
          {...register("inst")}
          placeholder="//write instructions separated by comma"
        ></textarea>
        <select
          className="block border-b outline-0 p-2"
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="mt-5 block bg-blue-900 px-4 py-2 rounded text-white">
          Update Recipe
        </button>
        <button
          type="button"
          onClick={DeleteHandler}
          className="mt-5 block bg-red-900 px-4 py-2 rounded text-white"
        >
          Delete Recipe
        </button>
      </form>
    </div>
  );
};

export default SingleRecipe;

// import { useContext } from "react";
// import { RecipeContext } from "../context/RecipeContext";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// const SingleRecipe = () => {
//   const { data, setdata } = useContext(RecipeContext);
//   const navigate = useNavigate();
//   const params = useParams();
//   const recipe = data.find((recipe) => recipe.id == params.id);

//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       title: recipe.title
//     }
//   });

//   const SubmitHandler = (updatedRecipe) => {
//     const index = data.findIndex((r) => r.id === params.id);
//     const copydata = [...data];
//     copydata[index] = { ...copydata[index], ...updatedRecipe };
//     setdata(copydata);
//     toast.success("Recipe updated successfully!");
//   };

//   const DeleteHandler = () => {
//     const filterdata = data.filter((r) => r.id !== params.id);
//     setdata(filterdata);
//     toast.success("Recipe deleted!");
//     navigate("/recipes");
//   };

//   return recipe ? (
//     <div className="w-full flex">
//       <div className="left w-1/2 p-2">
//         <h1 className="text-4xl font-black">{recipe.title}</h1>
//         <img className="h-[20vh]" src={recipe.image} alt={recipe.title} />
//       </div>

//       <form className="w-1/2 p-2" onSubmit={handleSubmit(SubmitHandler)}>
//         <input
//           className="block border-b outline-0 p-2"
//           {...register("image")}
//           type="url"
//           placeholder="Enter image Url"
//         />

//         <input
//           className="block border-b outline-0 p-2"
//           {...register("title")}
//           type="text"
//           placeholder="Recipe Title"
//         />

//         <input
//           className="block border-b outline-0 p-2"
//           {...register("chef")}
//           type="text"
//           placeholder="Chef Name"
//         />

//         <textarea
//           className="block border-b outline-0 p-2"
//           {...register("desc")}
//           placeholder="//start from here"
//         ></textarea>

//         <textarea
//           className="block border-b outline-0 p-2"
//           {...register("ingr")}
//           placeholder="//write ingredients separated by comma"
//         ></textarea>

//         <textarea
//           className="block border-b outline-0 p-2"
//           {...register("inst")}
//           placeholder="//write instructions separated by comma"
//         ></textarea>

//         <select
//           className="block border-b outline-0 p-2"
//           {...register("category")}
//         >
//           <option value="breakfast">Breakfast</option>
//           <option value="lunch">Lunch</option>
//           <option value="dinner">Dinner</option>
//         </select>

//         <button className="mt-5 block bg-blue-900 px-4 py-2 rounded text-white">
//           Update Recipe
//         </button>
//         <button
//           type="button"
//           onClick={DeleteHandler}
//           className="mt-5 block bg-red-900 px-4 py-2 rounded text-white"
//         >
//           Delete Recipe
//         </button>
//       </form>
//     </div>
//   ) : (
//     "Loading..."
//   );
// };

// export default SingleRecipe;


