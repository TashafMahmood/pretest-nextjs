import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center height-100">
      <Image
        width={161}
        height={178}
        src={"/noun-no-internet-access-4532233 1.png"}
      />
      <div className={styles.oops_text}>Oops!</div>
      <div className={styles.error_text}>
        Something went wrong, please try again
      </div>
    </div>
  );
}

export default NotFound;
