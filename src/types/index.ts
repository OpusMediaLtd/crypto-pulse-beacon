
// WordPress API response types
export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  author: number;
  tags: number[];
  featured_media: number;
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

export interface Ad {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    image_url: string;
    destination_url: string;
    placement: string;
    sort_order: number;
    status: "active" | "inactive";
  };
}

export interface Casino {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  acf: {
    name: string;
    description: string;
    image_url: string;
    affiliate_link: string;
    rank: number;
  };
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}
