import styles from "./MenuXS.module.scss";
import { NavLink, useLocation } from "react-router-dom";

function MenuXS({
  displayWishlist,
  hideMenu,
}: {
  displayWishlist: () => void;
  hideMenu: () => void;
}) {
  const location = useLocation();
  return (
    <ul onClick={hideMenu} className={`${styles.menuContainer} card p-20`}>
      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>
      {!location.pathname.includes("admin") && (
        <li onClick={displayWishlist}>Wishlist</li>
      )}

      {/* <li>Connexion</li> */}
    </ul>
  );
}

export default MenuXS;
