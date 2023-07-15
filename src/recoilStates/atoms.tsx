import { atom } from "recoil";
import { RecipeI } from "../interfaces";

export const recipesState = atom<RecipeI[]>({
  key: "recipesListe",
  default: [],
});

export const wishListDisplayState = atom({
  key: "whishListDisplayState",
  default: false,
});
