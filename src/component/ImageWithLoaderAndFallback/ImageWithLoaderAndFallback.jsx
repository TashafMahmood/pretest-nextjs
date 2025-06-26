'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ImageWithLoaderAndFallback.module.css';

const ImageWithLoaderAndFallback = ({
  src,
  alt,
  fallback = '/fallback.png',
  width = 100,
  height = 100,
  className = '',
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{ width, height }}
    >
      {loading && <div className={styles.shimmer} />}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.image} ${loading ? styles.hidden : ''}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setImgSrc(fallback);
          setLoading(false);
        }}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoaderAndFallback;
