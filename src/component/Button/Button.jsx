import React from "react";
import styles from "./Button.module.scss";
import { Spinner } from "react-bootstrap";

const Button = ({ onClickFunction, title, disable, loading }) => {
  return (
    <div className={styles.btnDiv}>
      <button
        className={disable ? styles.buttonMainDisable : styles.buttonMain}
        onClick={loading ? null : onClickFunction}
      >
        {loading ? (
          <div className={styles.submitButtonSpinnerWrapper}>
            <Spinner
              animation="border"
              className={styles.submitButtonSpinner}
            />
          </div>
        ) : (
          title
        )}
      </button>
    </div>
  );
};

export default Button;
