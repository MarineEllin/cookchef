import { deleteRecipe } from "apis";
import { RecipeI } from "interfaces";
import { MouseEvent } from "react";
import { ObjectId } from "types";
import styles from "./Recipe.module.scss";

function Recipe({
  recipe,
  updateRecipe,
  deleteRecipe,
}: {
  recipe: RecipeI;
  updateRecipe: (x: RecipeI) => Promise<void>;
  deleteRecipe: (x: ObjectId) => Promise<void>;
}) {
  function handleClickHeart(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    updateRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  async function handleDeleteRecipe(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    deleteRecipe(recipe._id);
  }

  return (
    <div className={styles.recipe}>
      <i onClick={handleDeleteRecipe} className="fa-solid fa-circle-xmark"></i>
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <i
          onClick={handleClickHeart}
          className={`${recipe.liked ? "text-primary" : ""} fa-solid fa-heart`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
