import { data } from "./recipes";

export async function seedRecipes() {
  await fetch("https://restapi.fr/api/recipesme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteAllRecipes() {
  await fetch("https://restapi.fr/api/recipesme", {
    method: "DELETE",
  });
}
