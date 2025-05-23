
import React from 'react';
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

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
      <div className="bg-secondary py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <AdSlot placement="home_header" className="max-w-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Latest News & Ad */}
          <div className="lg:col-span-3">
            <div className="section-header border-none mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Latest Crypto News
              </h2>
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
              <div className="space-y-4">
                {latestNews?.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/posts/${post.slug}`} 
                    className="flex gap-3 group"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-primary mb-1">
                        <span>Bitcoin</span>
                        <span>•</span>
                        <time className="text-muted-foreground">
                          {formatDate(post.date)}
                        </time>
                      </div>
                      <h3 
                        className="text-sm font-medium leading-tight group-hover:text-primary transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Add an Ad Slot to the Left Column */}
            <div className="mt-8 bg-card p-4 rounded-lg border border-border/30">
              <h2 className="text-base font-medium mb-4 text-foreground">Sponsored</h2>
              <AdSlot placement="left_column" />
            </div>
          </div>

          {/* Middle Column: Spotlight */}
          <div className="lg:col-span-6">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
            <div className="section-header">
              <h2 className="section-title">Deep Dives</h2>
            </div>
            
            {loadingDeepDives ? (
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className="h-16 w-16 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-0">
                {deepDives?.map((post) => (
                  <ThumbnailCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <div className="mt-8 bg-card p-4 rounded-lg border border-border/30">
              <h2 className="text-base font-medium mb-4 text-foreground">Sponsored</h2>
              <div className="space-y-4">
                <AdSlot placement="sidebar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
