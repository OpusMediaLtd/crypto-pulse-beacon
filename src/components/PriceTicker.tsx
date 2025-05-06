
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrices } from "@/services/api";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const PriceTicker = memo(() => {
  const isMobile = useIsMobile();
  const { data: prices, isLoading } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 45000, // Consider data fresh for 45 seconds
  });

  if (isLoading || !prices) {
    return (
      <div className="flex gap-4 animate-pulse overflow-x-auto whitespace-nowrap py-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-muted h-6 w-32 rounded"></div>
        ))}
      </div>
    );
  }

  // Use just enough duplicates to ensure continuous flow
  // Fewer duplicates = better performance
  const duplicatedPrices = [...prices, ...prices, ...prices];

  // Use ultra-slow and very-slow animation speeds for an extremely comfortable reading experience
  const animationClass = isMobile ? "animate-ticker-ultra-slow" : "animate-ticker-very-slow";

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`inline-flex ${animationClass} gap-6`}>
        {duplicatedPrices.map((coin, index) => (
          <div key={`${coin.id}-${index}`} className="flex items-center shrink-0">
            <span className="font-medium mr-2 font-mono text-sm">{coin.symbol.toUpperCase()}</span>
            <span className="font-mono text-sm">${coin.current_price.toLocaleString()}</span>
            <span 
              className={`ml-2 text-xs flex items-center ${
                coin.price_change_percentage_24h >= 0 
                  ? "text-green-500" 
                  : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PriceTicker;
