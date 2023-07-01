import { IApiPost } from 'apis/post';
import axios from 'axios';
import { ISitemapField, getServerSideSitemap } from 'next-sitemap';

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET() {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    const result: ISitemapField[] = [];
    const response = await axios.get('https://api.blog.steinjun.net/post');
    response.data.forEach((post: IApiPost) => {
        result.push({
            loc: `https://blog.steinjun.net/posts/${post.id}`,
            lastmod: new Date(post.updated_at).toISOString(),
        });
    });
    return getServerSideSitemap(result);
}