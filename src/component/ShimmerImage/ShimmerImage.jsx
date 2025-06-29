// components/ShimmerImage.js
import React, { useState } from "react";
import Image from "next/image";
import styles from "./ShimmerImage.module.css";

const ShimmerImage = ({ src, alt, width, height, style = {}, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={styles.wrapper}
      style={{ width, height, ...style }}
    >
      {!loaded && <div className={styles.shimmer} />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)} // hide shimmer on error too
        className={`${styles.image} ${loaded ? styles.visible : styles.hidden}`}
        {...rest}
      />
    </div>
  );
};

export default ShimmerImage;
