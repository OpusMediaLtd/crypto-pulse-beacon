
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
    <div className="featured-card mb-8">
      <Link to={`/posts/${post.slug}`} className="group">
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={imageUrl} 
              alt={post.title.rendered} 
              className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 article-gradient">
            <h3 
              className="text-2xl font-bold mb-2 text-white"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div 
              className="text-white/80 line-clamp-2 mb-2 text-sm"
              dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }}
            />
            <div className="flex items-center text-xs text-white/70">
              <time>{formatDate(post.date)}</time>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedCard;
