
import { useQuery } from "@tanstack/react-query";
import { fetchCasinos } from "@/services/api";
import Layout from "@/components/Layout";
import CasinoCard from "@/components/CasinoCard";
import AdSlot from "@/components/AdSlot";
import { Skeleton } from "@/components/ui/skeleton";

const CasinoList = () => {
  const { data: casinos, isLoading } = useQuery({
    queryKey: ["casinos"],
    queryFn: fetchCasinos,
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Top Ranked Casinos</h1>
        <p className="text-gray-600 mb-8">
          Discover our curated list of the best crypto casinos, ranked by our experts.
        </p>
        
        <div className="mb-8">
          <AdSlot placement="toplist_header" />
        </div>
        
        <div className="space-y-6">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[150px] w-full rounded-lg" />
            ))
          ) : casinos && casinos.length > 0 ? (
            casinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))
          ) : (
            <p>No casinos found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CasinoList;
