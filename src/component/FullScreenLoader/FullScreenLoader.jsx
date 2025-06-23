import React from "react";
import styles from "./fullscreenloader.module.scss";
import { Spinner } from "react-bootstrap";

const FullScreenLoader = () => {
  return (
    <div className={styles.loader_bg}>
      <div className={styles.loader_icon}>
        <Spinner animation="border" className={styles.submit_button_spinner} />
        <span className={styles.loading_text}>Loading...</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
