import { ChangeEvent, Dispatch } from "react";
import styles from "./SearchBar.module.scss";

function SearchBar({
  setFilter,
}: {
  setFilter: Dispatch<React.SetStateAction<string>>;
}) {
  function handleOnInputSearchBar(e: ChangeEvent<HTMLInputElement>) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  return (
    <div
      className={`${styles.searchBar} d-flex flex-row jusify-content-center align-items-center my-30`}
    >
      <i className="fa-solid fa-magnifying-glass mr-10"></i>
      <input
        onInput={handleOnInputSearchBar}
        className="flex-fill"
        type="text"
        placeholder="Rechercher"
      />
    </div>
  );
}

export default SearchBar;
