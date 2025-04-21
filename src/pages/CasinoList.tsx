
import { useQuery } from "@tanstack/react-query";
import { fetchCasinos } from "@/services/api";
import Layout from "@/components/Layout";
import CasinoCard from "@/components/CasinoCard";
import AdSlot from "@/components/AdSlot";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const CasinoList = () => {
  const { data: casinos, isLoading, error } = useQuery({
    queryKey: ["casinos"],
    queryFn: fetchCasinos,
    retry: 2,
  });

  if (error) {
    toast.error("Failed to load casino list. Please try again later.");
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 border-l-4 border-primary pl-3">
          Top Ranked Crypto Casinos
        </h1>
        
        <div className="w-full mb-8">
          <AdSlot placement="toplist_header" className="w-full" />
        </div>
        
        <p className="text-muted-foreground mb-8">
          Discover our curated selection of the best cryptocurrency-friendly casinos, 
          carefully ranked and reviewed by our experts.
        </p>
        
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
            <p className="text-center py-8 text-muted-foreground">
              No casinos found. Check back soon for updates.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CasinoList;
