

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import About from "../pages/About";
import Create from "../pages/Create";
import SingleRecipe from "../pages/SingleRecipe";
import Fav from "../pages/Fav";
import PageNotFound from "../pages/PageNotFound"; // ✅ new import

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/details/:id" element={<SingleRecipe />} />
      <Route path="/create-recipe" element={<Create />} />
      <Route path="/about" element={<About />} />
      <Route path="/fav" element={<Fav />} />
      <Route path="*" element={<PageNotFound />} /> {/* ✅ fixed */}
    </Routes>
  );
};

export default Mainroutes;

