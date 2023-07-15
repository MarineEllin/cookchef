import styles from "./AdminRecipesForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRecipe, updateRecipe } from "../../../../../../apis/recipe";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectActiveRecipe } from "recoilStates";
import { RecipeI } from "interfaces";

function AdminRecipesForm() {
  const { recipeId } = useParams();
  const recipe = useRecoilValue(selectActiveRecipe(recipeId));
  const navigate = useNavigate();

  const defaultValues = {
    title: recipe ? (recipe as RecipeI).title : "",
    image: recipe ? (recipe as RecipeI).image : "",
    generic: "",
  };

  const recipeSchema = yup.object({
    title: yup
      .string()
      .required("Provide title")
      .min(5, "Title min 5 caracters")
      .max(30, "Title max 30 caracters"),
    image: yup
      .string()
      .required("Procide an image")
      .url("Image must be a link"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  async function submit(values: Partial<RecipeI>) {
    try {
      clearErrors();
      if (recipe) {
        await updateRecipe({
          ...values,
          _id: (recipe as RecipeI)._id,
        });
        navigate("/admin/recipes/list");
      } else {
        await createRecipe(values);
        reset(defaultValues);
      }
    } catch (e) {
      setError("generic", { type: "generic", message: "Error" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">Add recipe</h2>
      <div className="d-flex flex-column mb-20">
        <label>Title</label>
        <input {...register("title")} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Image</label>
        <input {...register("image")} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default AdminRecipesForm;
