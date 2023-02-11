const axios = require('axios')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true, // (optional)
  // ...other options,
  additionalPaths: async (config) => {
    const result = []

    const response = await axios.get('https://api.blog.steinjun.net/post')
    response.data.forEach((post) => {
      result.push({
        loc: `/post/${post.id}`,
        changefreq: 'yearly',
        lastmod: new Date(post.updated_at).toISOString(),
      })
    })

    return result
  },
}