
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrices } from "@/services/api";
import { ArrowDown, ArrowUp } from "lucide-react";

const PriceTicker = () => {
  const { data: prices, isLoading } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    refetchInterval: 60000, // Refetch every minute
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

  return (
    <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 ticker px-2">
      {prices.map((coin) => (
        <div key={coin.id} className="flex items-center">
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
  );
};

export default PriceTicker;
