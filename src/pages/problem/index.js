// import React from 'react'
// import style from './index.module.css'

// const Problem = () => {
//   return (
//     <div className={style.container_div}>Download the app</div>
//   )
// }

// export default Problem

import styles from "./index.module.css";
import Image from "next/image";
import playstore from "../../../public/playstore.svg";
import google_play from "../../../public/google_play_text.svg";
import logo from "../../../public/theNetwork.svg";

export default function AccountScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Close Trigger */}
        {/* <button className={styles.closeButton} aria-label="Close sheet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}

        {/* Brand visual showcase */}
        <div className={styles.topSection}>
          <div className={styles.logo}>
            <Image src={logo} alt="logo"/>
          </div>

          {/* NEW: Device Mockup Image Asset instead of code */}
          <div className={styles.imageWrapper}>
            <img
              src="/display.webp" /* Replace with your actual asset path */
              alt="elRED Profile Preview"
              className={styles.halfDeviceImage}
            />
          </div>
        </div>

        {/* Action and Download zone */}
        <div className={styles.bottomSection}>
          <div className={styles.textGroup}>
            <h1 className={styles.headline}>You don't have an account!</h1>
            <p className={styles.subtext}>
              Please download <Image src={logo} alt="text" height={10} className={styles.logo_txt}/> app to get the best experience.
            </p>
          </div>

          <div className={styles.buttonGroup}>
            {/* Play Store Link */}
            <a href="#" className={styles.storeButton}>
              <Image src={playstore} alt="playstore" />
              <div className={styles.btnTextWrapper}>
                <p className={styles.btnLabel}>Get it on</p>
                <Image src={google_play} alt="google_play" />
              </div>
            </a>

            {/* iOS App Store Link */}
            {/* <a href="#" className={styles.storeButton}>
              <svg className={styles.icon} viewBox="0 0 384 512" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48-19.1-77.5-19.1-38.3 0-77 21.3-96.7 55.8-39.7 69-10.2 172.1 27.8 227 18.7 26.9 41.2 57.1 70.8 56 28.1-1.1 38.4-18.1 70.6-18.1 32 0 42 18.1 71.2 17.6 30.2-.5 50.1-27.4 68.7-54.4 21.4-31.2 30.3-61.5 30.7-63.1-1-1-65.7-25.2-66.3-95zM312 80c16-20.2 26.7-47.9 23.7-76-23.9 1-53.2 16-70.4 36.3-15.2 17.8-28.5 45.8-24.9 73.5 26.6 2.1 54.1-13.5 71.6-33.8z"/>
              </svg>
              <div className={styles.btnTextWrapper}>
                <p className={styles.btnLabel}>Download on</p>
                <p className={styles.btnTitle}>App Store</p>
              </div>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
