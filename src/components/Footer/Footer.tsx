import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center`}
    >
      Copyright © 2023 Marine
    </div>
  );
}

export default Footer;
