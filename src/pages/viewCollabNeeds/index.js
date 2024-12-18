import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import link from "../../../public/linknotfound.svg";
import { isMacOs } from "react-device-detect";

const viewCollabNeeds = () => {

  const downloadElred = () => {
    const url = "https://apps.apple.com/us/app/el-red/id6468586886";
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS || isMacOs) {
      window.open(url);
    } else {
      window.open(
        "https://play.google.com/store/search?q=el%20red&c=apps&hl=en_IN&gl=US",
        "_blank"
      );
    }
  };

  return (
    <div className={styles.main_cover}>
      <Image src={link} alt="" />
      <div className={styles.inner_div}>
        <div className={styles.oops}>Oops!</div>
        <div className={styles.msg}>This link is accessible only when the App is Installed</div>
        <div className={styles.download} onClick={downloadElred}>Download the App</div>
      </div>
    </div>
  );
};

export default viewCollabNeeds;
