'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import fallbackSrc from '@/assets/images/no_poster.jpg';

interface IBaseImageProps {
  src: string | StaticImageData;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}

const BaseImage = ({ src, width, height, className, alt='Movie Poster Image', ...props }: IBaseImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      priority
      className={className}
      {...props}
    />
  );
};

export default BaseImage;
