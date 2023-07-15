import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import Loading from "components/Loading/Loading";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState } from "react";
import { useFetchRecipes } from "hooks/useFetchRecipes";
import { updateRecipe as updateR, deleteRecipe as deleteR } from "apis/recipe";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectFilteredRecipes, wishListDisplayState } from "recoilStates";
import { recipesState } from "recoilStates";
import Wishlist from "./components/Wishlist/Wishlist";
import { RecipeI } from "interfaces";
import { ObjectId } from "types";

function Homepage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading] = useFetchRecipes(page);
  const setRecipes = useSetRecoilState(recipesState);
  const displayWishlist = useRecoilValue(wishListDisplayState);

  const recipes = useRecoilValue(selectFilteredRecipes(filter));

  async function updateRecipe(updatedRecipe: RecipeI) {
    const savedRecipe = await updateR(updatedRecipe);
    setRecipes(
      recipes.map((r) => (r._id === savedRecipe._id ? savedRecipe : r))
    );
  }

  function handleLoadMoreRecipes() {
    setPage(page + 1);
  }

  async function deleteRecipe(_id: ObjectId) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <>
      <div className="flex-fill container d-flex flex-column p-50-20">
        <h1 className="my-30">
          Découvrez nous nouvelles recettes{" "}
          <small className={styles.small}>({recipes.length})</small>
        </h1>
        <div
          className={`card p-20 flex-fill d-flex flex-column ${styles.contentElem}`}
        >
          <SearchBar setFilter={setFilter} />
          {loading && !recipes.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>
              {recipes
                .filter((r) => r.title.toLowerCase().includes(filter))
                .map((r) => (
                  <Recipe
                    key={r._id}
                    recipe={r}
                    updateRecipe={updateRecipe}
                    deleteRecipe={deleteRecipe}
                  />
                ))}
            </div>
          )}
          <div className="d-flex flex-row justify-content-center align-items-center p-20">
            <button onClick={handleLoadMoreRecipes} className="btn btn-primary">
              Load more
            </button>
          </div>
        </div>
      </div>
      {displayWishlist && <Wishlist />}
    </>
  );
}

export default Homepage;
