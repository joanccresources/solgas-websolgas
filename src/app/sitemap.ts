import type { MetadataRoute } from 'next'
import { geSiteMapPages, geSiteMapPosts } from './actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dataPages = await geSiteMapPages();
  const dataPost = await geSiteMapPosts();

  return [...(dataPages?.data ?? []), ...(dataPost?.data ?? [])].map((item: {
      priority: number;
      changefreq: string;
      lastmod: string;
      loc: string;
}) => { 
    return  {
        url:  item.loc,
        lastModified: item.lastmod,
        changeFrequency: item.changefreq as "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
        priority: item.priority,
      }
  }) 
}