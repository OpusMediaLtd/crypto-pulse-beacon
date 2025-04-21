
import { Link } from "react-router-dom";
import { Post } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

const ArticleCard = ({ post, featured = false }: ArticleCardProps) => {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg";
  const author = post._embedded?.author?.[0]?.name || "Unknown Author";
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className={`overflow-hidden h-full ${featured ? "lg:col-span-2 lg:row-span-2" : ""}`}>
      <div className={`relative ${featured ? "aspect-[16/9]" : "aspect-[3/2]"}`}>
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <Link to={`/posts/${post.slug}`}>
          <h3 
            className={`font-bold mb-2 text-gray-900 hover:text-purple-700 transition-colors ${
              featured ? "text-2xl" : "text-lg"
            }`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
        <div
          className="text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 text-sm text-gray-500">
        {author} • {date}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
