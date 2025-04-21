
import { WP_API_URL, CACHE_TTL } from "@/config/constants";
import { Post, Ad, Casino, CryptoPrice } from "@/types";

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

// Helper function to check if cached data is still valid
const isCacheValid = (timestamp: number) => {
  return Date.now() - timestamp < CACHE_TTL;
};

// Generic fetch with caching
async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data as T;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

// Function to fetch posts
export async function fetchPosts(): Promise<Post[]> {
  return fetchWithCache<Post[]>(`${WP_API_URL}/posts?_embed`);
}

// Function to fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const posts = await fetchWithCache<Post[]>(`${WP_API_URL}/posts?slug=${slug}&_embed`);
  return posts.length > 0 ? posts[0] : null;
}

// Function to fetch related posts by tag
export async function fetchRelatedPosts(tagIds: number[], currentPostId: number): Promise<Post[]> {
  if (!tagIds.length) return [];
  const tagQuery = tagIds.map(id => `tags[]=${id}`).join('&');
  const posts = await fetchWithCache<Post[]>(`${WP_API_URL}/posts?${tagQuery}&_embed`);
  return posts.filter(post => post.id !== currentPostId).slice(0, 3);
}

// Function to fetch all ads
async function fetchAllAds(): Promise<Ad[]> {
  return fetchWithCache<Ad[]>(`${WP_API_URL}/ad`);
}

// Function to fetch ads by placement with client-side filtering
export async function fetchAdsByPlacement(placement: string): Promise<Ad[]> {
  try {
    const allAds = await fetchAllAds();
    return allAds
      .filter(ad => ad.acf?.placement === placement && ad.acf?.status === "active")
      .map(ad => ({
        ...ad,
        acf: {
          ...ad.acf,
          image_url: ad.acf.image_url || '',
          destination_url: ad.acf.destination_url || '',
          placement: ad.acf.placement || '',
          sort_order: ad.acf.sort_order || 0,
          status: ad.acf.status || 'inactive'
        }
      }));
  } catch (error) {
    console.error(`Failed to fetch ads for placement ${placement}:`, error);
    return [];
  }
}

// Function to fetch casinos
export async function fetchCasinos(): Promise<Casino[]> {
  try {
    const casinos = await fetchWithCache<Casino[]>(`${WP_API_URL}/casino`);
    return casinos
      .map(c => ({
        ...c,
        acf: {
          ...c.acf,
          rank: c.acf?.rank || 0,
          description: c.acf?.description || '',
          affiliate_link: c.acf?.affiliate_link || '',
        }
      }))
      .sort((a, b) => (a.acf.rank || 0) - (b.acf.rank || 0));
  } catch (error) {
    console.error("Failed to fetch casino list:", error);
    return [];
  }
}

// Function to fetch a single casino by slug
export async function fetchCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    const response = await fetch(`${WP_API_URL}/casino?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch casino: ${response.statusText}`);
    }
    
    const casinos = await response.json();
    return casinos.length > 0 ? casinos[0] : null;
  } catch (error) {
    console.error(`Failed to fetch casino by slug ${slug}:`, error);
    return null;
  }
}

// Function to fetch crypto prices from CoinGecko
export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  const url = "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&ids=bitcoin,ethereum,binancecoin,solana,cardano" +
    "&order=market_cap_desc" +
    "&per_page=5&page=1" +
    "&sparkline=false" +
    "&price_change_percentage=24h";

  return fetchWithCache<CryptoPrice[]>(url);
}
