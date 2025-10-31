



import { useForm } from "react-hook-form"
import { nanoid } from "nanoid";
import { useContext } from "react";
import {RecipeContext} from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Create = () => {
   const navigate = useNavigate();
   const {data,setdata} = useContext(RecipeContext)
    const { register, handleSubmit,reset } = useForm();


    const SubmitHandler = (recipe) => {
        recipe.id = nanoid();
        console.log(recipe);

        const copydata = [...data];
        copydata.push(recipe);
        setdata(copydata);
        toast.success("New recipe created!");
        reset();
        navigate("/recipes");
    }
    return (
        <form onSubmit={handleSubmit(SubmitHandler)}>
            <input
                className="block border-b outline-0 p-2"
                {...register("image")}
                type="url"
                placeholder="Enter image Url"

            />
            <small className="text-red-400">This is how the error is shown</small>
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
                placeholder="Recipe Title"
            />
            <small className="text-red-400">This is how the error is shown</small>

            <textarea
                className="block border-b outline-0 p-2"
                {...register("desc")}
                placeholder="//start from here"
            ></textarea>

            <small className="text-red-400">This is how the error is shown</small>

            <textarea
                className="block border-b outline-0 p-2"
                {...register("ingr")}
                placeholder="//write ingredients seperated by comma"
            ></textarea>

            <small className="text-red-400">This is how the error is shown</small>

            <textarea
                className="block border-b outline-0 p-2"
                {...register("inst")}
                placeholder="//write instruction seperated by comma"
            ></textarea>

            <select
                className="block border-b outline-0 p-2"
                {...register("category")}

            >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>

            </select>

            <small className="text-red-400">This is how the error is shown</small>

            <button className=" mt-5 block bg-gray-900 px-4 py-2 rounded">Save Recipe</button>


        </form>
    )
}

export default Create;