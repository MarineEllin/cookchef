import { useEffect, useState } from "react";
import { getRecipes } from "../apis";
import { useSetRecoilState } from "recoil";
import { recipesState } from "../recoilStates/atoms";

export function useFetchRecipes(page?: number): [boolean, string] {
  const setRecipes = useSetRecoilState(recipesState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setLoading(true);
        let queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("skip", `${(page - 1) * 18}`);
          queryParam.append("limit", `${18}`);
        }
        const fetchedRecipes = await getRecipes(queryParam);
        if (!cancel) {
          if (page && page !== 1) {
            setRecipes((x) => [...x, ...fetchedRecipes]);
          } else {
            setRecipes(fetchedRecipes);
          }
        }
      } catch (e) {
        setError("Error");
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => {
      cancel = true;
    };
  }, [page, setRecipes]);
  return [loading, error];
}
