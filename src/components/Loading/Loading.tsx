import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center flex-fill">
      <i className={`${styles.spinner} fa-solid fa-stroopwafel`}></i>
    </div>
  );
}

export default Loading;
