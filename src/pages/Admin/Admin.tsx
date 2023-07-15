import styles from "./Admin.module.scss";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminNav from "./components/AdminNav/AdminNav";
import Loading from "components/Loading/Loading";

function Admin() {
  const { key } = useLocation();
  return (
    <div className={`${styles.container} d-flex flex-fill p-20`}>
      <AdminNav />
      <div className="d-flex flex-column flex-fill">
        <Suspense fallback={<Loading />}>
          <Outlet key={key} />
        </Suspense>
      </div>
    </div>
  );
}

export default Admin;
