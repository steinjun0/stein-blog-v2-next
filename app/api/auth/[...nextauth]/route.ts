import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID ?? "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
            async profile(profile) {
                return {
                    id: String(profile.id),
                    name: profile.kakao_account?.profile?.nickname,
                    email: profile.kakao_account?.email,
                    image: profile.kakao_account?.profile?.profile_image_url,
                };
            },
        })
    ],
    callbacks: {
        async session({ session, token }: any) {
            session.user.id = token.sub;
            return session;
        }
    },
});
export { handler as GET, handler as POST };