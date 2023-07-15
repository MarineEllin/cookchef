import { deleteRecipe as deleteR } from "apis/recipe";
import styles from "./AdminRecipesList.module.scss";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recipesState } from "recoilStates";
import { ObjectId } from "types";

function AdminRecipesList() {
  //useFetchRecipes();
  const [recipes, setRecipes] = useRecoilState(recipesState);

  async function deleteRecipe(_id: ObjectId) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }
  return (
    <ul className={styles.list}>
      {recipes.length
        ? recipes.map((r) => (
            <li key={r._id} className="d-flex align-items-center">
              <span className="flex-fill">{r.title}</span>
              <NavLink to={`../edit/${r._id}`}>
                <button className="btn btn-reverse-primary">Edit</button>
              </NavLink>

              <button
                onClick={() => deleteRecipe(r._id)}
                className="btn btn-warning"
              >
                Delete
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default AdminRecipesList;
