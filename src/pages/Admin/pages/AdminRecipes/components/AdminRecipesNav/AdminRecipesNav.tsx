import { NavLink } from "react-router-dom";
import styles from "./AdminRecipesNav.module.scss";

function AdminRecipesNav() {
  return (
    <ul className="mb-20">
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="list"
      >
        See recipes list
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="new"
      >
        Create a new recipe
      </NavLink>
    </ul>
  );
}

export default AdminRecipesNav;
