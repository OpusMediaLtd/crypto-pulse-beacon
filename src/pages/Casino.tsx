
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCasinoBySlug } from "@/services/api";
import Layout from "@/components/Layout";
import AdSlot from "@/components/AdSlot";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Casino = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: casino, isLoading } = useQuery({
    queryKey: ["casino", slug],
    queryFn: () => fetchCasinoBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Layout>
    );
  }

  if (!casino) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Casino not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <AdSlot placement="toplist_header" />
        
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-4">{casino.acf.name}</h1>
          <img 
            src={casino.acf.image_url} 
            alt={casino.acf.name}
            className="w-48 h-48 object-contain mb-4"
          />
          <div className="prose max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: casino.content.rendered }} />
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => window.open(casino.acf.affiliate_link, "_blank", "noopener,noreferrer")}
          >
            Visit Casino
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Casino;
