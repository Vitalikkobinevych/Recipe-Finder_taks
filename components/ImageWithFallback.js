'use client';

import NextImage from 'next/image';
import { useState, useEffect } from 'react';

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, onError: parentOnErrorCallback, ...rest } = props;
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src); // Reset to the original src if the src prop changes
  }, [src]);

  const handleError = (e) => {
    // If the current source is already the fallback, don't try to set it again
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    // Call any onError callback passed from the parent component
    if (typeof parentOnErrorCallback === 'function') {
      parentOnErrorCallback(e);
    }
  };

  return <NextImage {...rest} src={currentSrc} onError={handleError} />;
};

export default ImageWithFallback;
