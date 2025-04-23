
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
      <div className="mb-6">
        <AdSlot placement="home_header" className="max-w-full mx-auto" />
      </div>

      <div className="home-grid">
        {/* Left Column: Latest News */}
        <div className="home-sidebar">
          <div className="section-header">
            <h2 className="section-title">Latest News</h2>
          </div>
          
          {loadingNews ? (
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-border/30">
              {latestNews?.map((post) => (
                <div key={post.id} className="group pt-4 first:pt-0">
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
        <div className="home-main">
          <div className="section-header">
            <h2 className="section-title">News Spotlight</h2>
          </div>
          
          {loadingSpotlight ? (
            <div className="space-y-6">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
          ) : (
            <>
              {spotlight && spotlight.length > 0 && (
                <>
                  <FeaturedCard post={spotlight[0]} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="home-sidebar">
          <div className="section-header">
            <h2 className="section-title">Deep Dives</h2>
          </div>
          
          {loadingDeepDives ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="h-14 w-14 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {deepDives?.map((post) => (
                <ThumbnailCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-6 bg-card p-4 rounded-lg border border-border/30">
            <h2 className="text-base font-medium mb-4 text-foreground">Sponsored</h2>
            <div className="space-y-4">
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
