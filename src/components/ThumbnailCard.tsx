
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';

interface ThumbnailCardProps {
  post: Post;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
  
  return (
    <Link to={`/posts/${post.slug}`} className="thumbnail-card flex gap-3 mb-4 group">
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
        <img 
          src={imageUrl} 
          alt={post.title.rendered} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <h3 
        className="text-sm font-medium line-clamp-3 group-hover:text-primary transition-colors"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
    </Link>
  );
};

export default ThumbnailCard;
