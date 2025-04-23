
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';

interface FeaturedCardProps {
  post: Post;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
  
  return (
    <div className="featured-card mb-6">
      <Link to={`/posts/${post.slug}`} className="group">
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={imageUrl} 
              alt={post.title.rendered} 
              className="object-cover w-full h-full rounded-t-lg group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 
                className="text-xl md:text-2xl font-semibold mb-2 text-white"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className="flex items-center text-xs text-white/80">
                <time>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div 
            className="text-foreground/80 line-clamp-2 text-sm"
            dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }}
          />
        </div>
      </Link>
    </div>
  );
};

export default FeaturedCard;
