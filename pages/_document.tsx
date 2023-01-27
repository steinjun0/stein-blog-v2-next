import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const description = "Blog for Stein. Engineering, Music, Camera, Art, and Life."
  const url = "https://blog.steinjun.net/"
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="https://blog.steinjun.net/stein-logo.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>stein-blog</title>
        <meta name="description" content={description} />
        <meta name="author" content="Steinjun_0" />
        <meta name="robots" content="index, follow" />
        <meta name="color-scheme" content="light only" />

        {/*  Facebook Meta Tags  */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="stein-blog" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://blog.steinjun.net/stein-logo.svg" />

        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="blog.steinjun.net" />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content="stein-blog" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://blog.steinjun.net/stein-logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}