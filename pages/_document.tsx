import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

declare global {
  interface Window {
    Kakao: any,
    dataLayer: any
  }
}

export default function Document() {
  return (
    <Html>
      <body>
        <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          crossOrigin="anonymous"
          strategy='beforeInteractive'
        ></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}