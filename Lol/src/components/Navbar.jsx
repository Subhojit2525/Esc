
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex items-center justify-center gap-x-15 text-sm mb-15' >

      <NavLink
        className={(e) => (e.isActive ? "text-red-300" : undefined)}
        to="/"
      >
        Home
      </NavLink>


      <NavLink
        className={(e) => (e.isActive ? "text-red-300" : undefined)}
        to="/recipes"
      >
        Recipes
      </NavLink>


      <NavLink
        className={(e) => (e.isActive ? "text-red-300" : undefined)}
        to="/about"
      >
        About

      </NavLink>

      <NavLink
        className={(e) => (e.isActive ? "text-red-300" : undefined)}
        to="/create-recipe"
      >
        Create Recipe
      </NavLink>

      <NavLink
        className={(e) => (e.isActive ? "text-red-300" : undefined)}
        to="/fav"
      >
        Favroites
      </NavLink>

    </div>
  )
}

export default Navbar;