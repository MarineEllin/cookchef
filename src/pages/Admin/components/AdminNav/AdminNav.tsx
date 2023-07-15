import styles from "./AdminNav.module.scss";
import { NavLink } from "react-router-dom";

function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column mr-15`}>
      <NavLink
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        to="recipes"
      >
        Recipes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        to="users"
      >
        Users
      </NavLink>
    </ul>
  );
}

export default AdminNav;
