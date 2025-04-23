
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';

interface SmallCardProps {
  post: Post;
}

const SmallCard: React.FC<SmallCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
  
  return (
    <Link to={`/posts/${post.slug}`} className="small-card group mb-4">
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded">
        <img 
          src={imageUrl} 
          alt={post.title.rendered} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="flex-1">
        <h3 
          className="text-base font-medium mb-1 line-clamp-2 group-hover:text-primary transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <time className="text-xs text-muted-foreground">{formatDate(post.date)}</time>
      </div>
    </Link>
  );
};

export default SmallCard;
