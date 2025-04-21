
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ad } from "@/types";
import { fetchAdsByPlacement } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

interface AdSlotProps {
  placement: string;
  className?: string;
}

const AdSlot = ({ placement, className = "" }: AdSlotProps) => {
  const [randomAd, setRandomAd] = useState<Ad | null>(null);

  const { data: ads, isLoading, error } = useQuery({
    queryKey: ["ads", placement],
    queryFn: () => fetchAdsByPlacement(placement),
  });

  useEffect(() => {
    if (ads && ads.length > 0) {
      // Filter for active ads
      const activeAds = ads.filter(ad => ad.acf.status === "active");
      if (activeAds.length > 0) {
        // Select a random ad from the available active ads
        const randomIndex = Math.floor(Math.random() * activeAds.length);
        setRandomAd(activeAds[randomIndex]);
      }
    }
  }, [ads]);

  if (isLoading) {
    return <Skeleton className={`w-full h-[250px] ${className}`} />;
  }

  if (error || !ads || ads.length === 0 || !randomAd) {
    return null;
  }

  return (
    <div className={`ad-slot ${className}`}>
      <a 
        href={randomAd.acf.destination_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full"
      >
        <img 
          src={randomAd.acf.image_url} 
          alt={randomAd.title.rendered} 
          className="w-full h-auto"
        />
      </a>
      <p className="text-xs text-gray-500 text-center mt-1">Advertisement</p>
    </div>
  );
};

export default AdSlot;
