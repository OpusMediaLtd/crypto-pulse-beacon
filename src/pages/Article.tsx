
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostBySlug, fetchRelatedPosts } from "@/services/api";
import Layout from "@/components/Layout";
import AdSlot from "@/components/AdSlot";
import SocialShare from "@/components/SocialShare";
import RelatedPosts from "@/components/RelatedPosts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";
import { getReadingTime } from "@/lib/utils";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug || ""),
  });

  const { data: relatedPosts, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["relatedPosts", post?.id, post?.tags],
    queryFn: () => (post?.id && post?.tags ? fetchRelatedPosts(post.tags, post.id) : []),
    enabled: !!post?.id && !!post?.tags,
  });

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
                <BreadcrumbLink href="/">News</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {post ? post.title.rendered.replace(/<\/?[^>]+(>|$)/g, "") : "Loading..."}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {isLoadingPost ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-[400px] w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : post ? (
            <>
              <article className="bg-card border border-border/30 p-6 rounded-lg shadow-sm">
                <h1 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                
                {post._embedded?.author && (
                  <div className="flex items-center justify-between text-muted-foreground mb-6">
                    <div>
                      By {post._embedded.author[0].name} • 
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm">
                      {post.content && `${getReadingTime(post.content.rendered)} min read`}
                    </div>
                  </div>
                )}
                
                {post._embedded?.["wp:featuredmedia"] && (
                  <div className="mb-6">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
                      className="w-full h-auto rounded"
                    />
                  </div>
                )}
                
                <div className="article-content mb-8">
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
                
                <AdSlot placement="inline" className="my-8" />
                
                <SocialShare title={post.title.rendered} url={currentUrl} />
              </article>
              
              {!isLoadingRelated && relatedPosts && (
                <RelatedPosts posts={relatedPosts} />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
              <p>The article you're looking for doesn't exist or has been removed.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Article;
