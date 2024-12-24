import React from "react";
import styles from "./index.module.css";
import successIcon from "../../../public/success.svg";
import errorIcon from "../../../public/error.svg";
import warningIcon from "../../../public/warning.svg";
import Image from "next/image";

const PopUp = ({ warning, success, error, setPopup }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.img_div}>
          {warning && <Image src={warningIcon} alt="" />}
          {success && <Image src={successIcon} alt="" />}
          {error && <Image src={errorIcon} alt="" />}
        </div>
        <div className={styles.msg}>
          {warning && "Limit exceeded"}
          {success && "Success"}
          {error && "Error"}
        </div>
        <div className={styles.desc}>
          {warning && "You have exceeded maximum number of requests."}
          {success && "Your form has been successfully submitted."}
          {error && "Server error, please try after sometime."}
        </div>
        {warning && (
          <div
            className={styles.ok_warning}
            onClick={(prev) => setPopup(!prev)}
          >
            Ok
          </div>
        )}
        {success && (
          <div
            className={styles.ok_success}
            onClick={(prev) => setPopup(!prev)}
          >
            Ok
          </div>
        )}
        {error && (
          <div className={styles.ok_error} onClick={(prev) => setPopup(!prev)}>
            Ok
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
