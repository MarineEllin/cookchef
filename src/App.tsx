import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "components/Loading/Loading";
import { deleteAllRecipes, seedRecipes } from "./data/seed";

function App() {
  deleteAllRecipes();
  seedRecipes();
  seedRecipes();

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className="d-flex flex-column flex-fill">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
