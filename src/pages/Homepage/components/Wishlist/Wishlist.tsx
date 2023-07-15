import { updateRecipe } from "apis/recipe";
import Animation from "components/Animation/Animation";
import { RecipeI } from "interfaces";

import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  recipesState,
  selectWishedRecipes,
  wishListDisplayState,
} from "recoilStates";
import styles from "./Wishlist.module.scss";

function Wishlist() {
  const [displayWishlist, setDisplayWishlist] =
    useRecoilState(wishListDisplayState);
  const wishedRecipes = useRecoilValue(selectWishedRecipes);
  const setRecipes = useSetRecoilState(recipesState);

  async function handleClickDislikeRecipe(recipe: RecipeI) {
    const updatedRecipe = await updateRecipe({ ...recipe, liked: false });
    setRecipes((oldRecipes) =>
      oldRecipes.map((or) =>
        or._id === updatedRecipe._id ? updatedRecipe : or
      )
    );
  }

  return (
    <div
      className={styles.wishlistContainer}
      onClick={() => setDisplayWishlist(false)}
    >
      <Animation in={displayWishlist}>
        <div
          onClick={(event) => event.stopPropagation()}
          className={`${styles.wishlist} d-flex flex-column align-items-center`}
        >
          <h4 className="mb-20">WishList</h4>
          <ul>
            {wishedRecipes.length === 0 && <span>Add favorite</span>}
            {!!wishedRecipes.length &&
              wishedRecipes.map((r) => (
                <li key={r._id} className="mb-5 d-flex">
                  <span className="flex-fill mr-15">{r.title}</span>
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => handleClickDislikeRecipe(r)}
                  ></i>
                </li>
              ))}
          </ul>
        </div>
      </Animation>
    </div>
  );
}

export default Wishlist;
