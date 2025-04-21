
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/api";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <Layout>
      <div className="mb-8">
        <AdSlot placement="home_header" className="max-w-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-3">Latest Crypto News</h1>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, index) => (
                <ArticleCard key={post.id} post={post} featured={index === 0} />
              ))}
            </div>
          ) : (
            <p>No articles found.</p>
          )}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="sticky top-6 bg-secondary/20 p-6 rounded-lg border border-border/30">
            <h2 className="text-xl font-bold mb-4 text-foreground">Sponsored</h2>
            <div className="space-y-6">
              <AdSlot placement="sidebar" />
              <AdSlot placement="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
