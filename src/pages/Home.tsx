
import { useQuery } from "@tanstack/react-query";
import { fetchLatestNews, fetchSpotlight, fetchDeepDives } from "@/services/api";
import Layout from "@/components/Layout";
import AdSlot from "@/components/AdSlot";
import FeaturedCard from "@/components/FeaturedCard";
import SmallCard from "@/components/SmallCard";
import ThumbnailCard from "@/components/ThumbnailCard";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: latestNews, isLoading: loadingNews } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
  });

  const { data: spotlight, isLoading: loadingSpotlight } = useQuery({
    queryKey: ["spotlight"],
    queryFn: fetchSpotlight,
  });

  const { data: deepDives, isLoading: loadingDeepDives } = useQuery({
    queryKey: ["deepDives"],
    queryFn: fetchDeepDives,
  });

  return (
    <Layout>
      <div className="mb-8">
        <AdSlot placement="home_header" className="max-w-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Latest News */}
        <div className="lg:col-span-3">
          <div className="mb-6 border-b border-border/30 pb-2">
            <h2 className="text-xl font-bold border-l-4 border-primary pl-3">Latest Crypto News</h2>
          </div>
          
          {loadingNews ? (
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {latestNews?.map((post) => (
                <div key={post.id} className="group">
                  <Link to={`/posts/${post.slug}`} className="block">
                    <h3 
                      className="text-base font-medium group-hover:text-primary transition-colors" 
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>
                  <time className="text-xs text-muted-foreground block mt-1">{formatDate(post.date)}</time>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Middle Column: Spotlight */}
        <div className="lg:col-span-6">
          <div className="mb-6 border-b border-border/30 pb-2">
            <h2 className="text-xl font-bold border-l-4 border-primary pl-3">Crypto News Spotlight</h2>
          </div>
          
          {loadingSpotlight ? (
            <div className="space-y-8">
              <Skeleton className="h-[300px] w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          ) : (
            <>
              {spotlight && spotlight.length > 0 && (
                <>
                  <FeaturedCard post={spotlight[0]} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {spotlight.slice(1, 3).map((post) => (
                      <SmallCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Column: Deep Dives & Ad */}
        <div className="lg:col-span-3">
          <div className="mb-6 border-b border-border/30 pb-2">
            <h2 className="text-xl font-bold border-l-4 border-primary pl-3">Deep Dives</h2>
          </div>
          
          {loadingDeepDives ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="h-16 w-16" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {deepDives?.map((post) => (
                <ThumbnailCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-8 bg-secondary/20 p-4 rounded-lg border border-border/30">
            <h2 className="text-lg font-bold mb-4 text-foreground">Sponsored</h2>
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
