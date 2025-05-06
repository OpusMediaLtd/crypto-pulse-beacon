
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderHeight?: string;
}

const LazyImage = ({ src, alt, className, placeholderHeight = "h-full" }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading when image is 200px from viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative" ref={imgRef}>
      {!isLoaded && <Skeleton className={`w-full ${placeholderHeight} absolute inset-0`} />}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={className}
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s" }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyImage;
