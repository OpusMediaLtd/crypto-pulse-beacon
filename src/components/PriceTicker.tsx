
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrices } from "@/services/api";

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
          <div key={i} className="bg-gray-700 h-6 w-32 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-1 ticker">
      {prices.map((coin) => (
        <div key={coin.id} className="flex items-center">
          <span className="font-medium mr-2">{coin.symbol.toUpperCase()}</span>
          <span>${coin.current_price.toLocaleString()}</span>
          <span 
            className={`ml-2 text-xs ${
              coin.price_change_percentage_24h >= 0 
                ? "text-green-400" 
                : "text-red-400"
            }`}
          >
            {coin.price_change_percentage_24h >= 0 ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default PriceTicker;
