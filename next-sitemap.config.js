const axios = require('axios')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true, // (optional)
  exclude: ['/server-sitemap-post.xml', '/login', '/login/auth'],
  // ...other options,
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap-post.xml`]
  },
}