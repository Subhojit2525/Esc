



import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Fav = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on page load
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  // Remove a recipe from favorites
  const removeFav = (id) => {
    const newFavs = favorites.filter((r) => String(r.id) !== String(id));
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    toast.info("Removed from favorites 💔");
  };

  if (favorites.length === 0) {
    return (
      <h1 className="text-center text-2xl mt-10 text-gray-300">
        No favorites yet 💔
      </h1>
    );
  }

  return (
    <div className="p-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
      {favorites.map((r) => (
        <div
          key={r.id}
          className="shadow-lg bg-white/10 p-3 rounded-2xl text-white relative hover:scale-105 duration-200"
        >
          <img
            src={r.image}
            alt={r.title}
            className="h-[200px] w-full object-cover rounded-lg mb-3"
          />
          <h2 className="text-xl font-bold">{r.title}</h2>
          <p className="text-gray-300">{r.chef}</p>
          <button
            onClick={() => removeFav(r.id)}
            className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
          >
            💔 Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Fav;
