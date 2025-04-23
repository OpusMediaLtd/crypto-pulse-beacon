
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';

interface ThumbnailCardProps {
  post: Post;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
  
  return (
    <Link to={`/posts/${post.slug}`} className="flex items-start gap-3 p-3 mb-4 bg-card hover:bg-secondary/50 rounded-md transition-colors group">
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={imageUrl} 
          alt={post.title.rendered} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div>
        <h3 
          className="text-sm font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <time className="text-xs text-muted-foreground">
          {formatDate(post.date)}
        </time>
      </div>
    </Link>
  );
};

export default ThumbnailCard;
