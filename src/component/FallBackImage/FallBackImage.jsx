'use client';
import Image from 'next/image';
import { useState } from 'react';
import avatar from '../../../public/userprofile.svg'

const FallbackImage = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(avatar)}
    />
  );
};

export default FallbackImage;