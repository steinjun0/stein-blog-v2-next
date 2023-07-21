import Gnb from "organisms/common/Gnb";
import "styles/globals.css";
import "styles/markdown-editor.css";
import "styles/markdown.css";
import SessionProviderWrapper from './SessioProvider';
import ThemeProviderWrapper from "./ThemeProviderWrapper";


export default function RootLayout({
  children, pageProps
}: {
  children: React.ReactNode,
  pageProps: any;
}) {
  return (
    <html>
      <body>
        {/* TODO: QueryClientProvider */}
        {/* TODO: ReactQueryDevtools */}
        <ThemeProviderWrapper>
          <SessionProviderWrapper>
            <Gnb />
            <div className='flex justify-center'>
              <div className='flex justify-center px-4 xl:px-0 mt-20 w-screen' style={{ maxWidth: '1240px' }}>
                {children}
              </div>
            </div>
          </SessionProviderWrapper>
        </ThemeProviderWrapper >
      </body>
    </html>
  );
}