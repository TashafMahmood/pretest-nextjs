import React from "react";
import welcome from "../../../public/welcome.svg";
import styles from './homecomponent.module.css';
import Image from "next/image";

const HomeComponent = () => {
  return (
    <div className={styles.inner_div}>
      <div className={styles.image_div}>
        <Image src={welcome} alt="" />
      </div>
      <div className={styles.title}>Welcome to el RED!</div>
      <div className={styles.description}>
        Congratulations! You now have free and unlimited access to your
        exclusive network.
      </div>
    </div>
  );
};

export default HomeComponent;
