
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostBySlug, fetchRelatedPosts } from "@/services/api";
import Layout from "@/components/Layout";
import AdSlot from "@/components/AdSlot";
import RelatedPosts from "@/components/RelatedPosts";
import SocialShare from "@/components/SocialShare";
import { Skeleton } from "@/components/ui/skeleton";

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["relatedPosts", post?.tags],
    queryFn: () => fetchRelatedPosts(post?.tags || [], post?.id || 0),
    enabled: !!post?.tags,
  });

  if (isLoadingPost) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Post not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <h1 
          className="text-4xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <AdSlot placement="article_header" />
        
        <div 
          className="prose prose-lg max-w-none my-8"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        
        <AdSlot placement="article_footer" />
        
        <div className="my-8">
          <SocialShare 
            title={post.title.rendered} 
            url={window.location.href} 
          />
        </div>

        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </article>
    </Layout>
  );
};

export default Post;
