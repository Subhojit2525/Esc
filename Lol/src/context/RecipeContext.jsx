import { createContext, useEffect, useState } from "react"




export const RecipeContext = createContext(null);


const RecipeProvider =(props) => {

   

  const [data, setdata] = useState([]);

  useEffect(() => {
   setdata(JSON.parse( localStorage.getItem("recipes"))  || []);
  }, []);
  

  return (<RecipeContext.Provider value={{data, setdata}}>

    {props.children}

  </RecipeContext.Provider>
  );
};

export default RecipeProvider;