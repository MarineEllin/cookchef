import styles from "./Header.module.scss";
import MenuXS from "./components/MenuXS/MenuXS";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { wishListDisplayState } from "../../recoilStates/atoms";

function Header() {
  const [showMenuXS, setShowMenuXS] = useState(false);
  const [displayWishlist, setDisplayWishlist] =
    useRecoilState(wishListDisplayState);
  const location = useLocation();

  function handleClickMenuXS() {
    setShowMenuXS(!showMenuXS);
  }

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className={` d-flex flex-row flex-fill align-items-center`}>
        <NavLink to="/">
          <span
            className={`${styles.logo} d-flex flex-row justify-content-center align-items-center`}
          >
            <i className="fa-solid fa-utensils"></i>
            <p>Cookchef</p>
          </span>
        </NavLink>
      </div>
      <ul className={`${styles.headerList} d-flex align-items-center`}>
        <NavLink to="/admin">
          <button className="mr-15 btn btn-reverse-primary">Amin</button>
        </NavLink>
        {!location.pathname.includes("admin") && (
          <button
            onClick={() => setDisplayWishlist(!displayWishlist)}
            className="mr-15 btn btn-reverse-primary"
          >
            <i className="fa-regular fa-heart mr-10"></i>
            <span>Wishlist</span>
          </button>
        )}
        {/* <button className="mr-15 btn btn-primary">Connexion</button> */}
      </ul>
      <i
        onClick={handleClickMenuXS}
        className={`${styles.menuXS} fa-solid fa-bars`}
      ></i>
      {showMenuXS && (
        <>
          <div onClick={() => setShowMenuXS(false)} className="calc"></div>
          <MenuXS
            displayWishlist={() => setDisplayWishlist(true)}
            hideMenu={() => setShowMenuXS(false)}
          />
        </>
      )}
    </header>
  );
}

export default Header;
