
import { Post } from "@/types";
import ArticleCard from "./ArticleCard";

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="related-posts my-12">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
