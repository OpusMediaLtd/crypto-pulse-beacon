
import { Post, Ad, Casino, CryptoPrice } from "@/types";

// WordPress API endpoint (should be replaced with the actual WordPress URL)
const WP_API_URL = "https://example-wp-api.com/wp-json/wp/v2";

// CoinGecko API endpoint
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

// Function to fetch posts
export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${WP_API_URL}/posts?_embed`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Function to fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
    if (!response.ok) throw new Error('Failed to fetch post');
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Function to fetch related posts by tag
export async function fetchRelatedPosts(tagIds: number[], currentPostId: number): Promise<Post[]> {
  try {
    if (!tagIds.length) return [];
    const tagQuery = tagIds.map(id => `tags[]=${id}`).join('&');
    const response = await fetch(`${WP_API_URL}/posts?${tagQuery}&_embed`);
    if (!response.ok) throw new Error('Failed to fetch related posts');
    const posts = await response.json();
    return posts.filter((post: Post) => post.id !== currentPostId).slice(0, 3);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// Function to fetch ads
export async function fetchAds(): Promise<Ad[]> {
  try {
    const response = await fetch(`${WP_API_URL}/ad`);
    if (!response.ok) throw new Error('Failed to fetch ads');
    return await response.json();
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
}

// Function to fetch ads by placement
export async function fetchAdsByPlacement(placement: string): Promise<Ad[]> {
  try {
    const response = await fetch(`${WP_API_URL}/ad?placement=${placement}`);
    if (!response.ok) throw new Error(`Failed to fetch ads for placement: ${placement}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ads for placement ${placement}:`, error);
    return [];
  }
}

// Function to fetch casinos
export async function fetchCasinos(): Promise<Casino[]> {
  try {
    const response = await fetch(`${WP_API_URL}/casino`);
    if (!response.ok) throw new Error('Failed to fetch casinos');
    const casinos = await response.json();
    return casinos.sort((a: Casino, b: Casino) => a.acf.rank - b.acf.rank);
  } catch (error) {
    console.error("Error fetching casinos:", error);
    return [];
  }
}

// Function to fetch a single casino by slug
export async function fetchCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    const response = await fetch(`${WP_API_URL}/casino?slug=${slug}`);
    if (!response.ok) throw new Error('Failed to fetch casino');
    const casinos = await response.json();
    return casinos.length > 0 ? casinos[0] : null;
  } catch (error) {
    console.error(`Error fetching casino with slug ${slug}:`, error);
    return null;
  }
}

// Function to fetch crypto prices
export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,cardano&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`
    );
    if (!response.ok) throw new Error('Failed to fetch crypto prices');
    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
}
