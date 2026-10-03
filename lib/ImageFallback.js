import Image from "next/image";
import { useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...rest}
      src={imgSrc}
      //onLoad={() => setIsLoading(false)}
      onLoad={() => setTimeout(() => setIsLoading(false), 500)}
      style={{ opacity: isLoading ? 0 : 1 }} 
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
