import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        KakaoProvider({
            clientId: '1add2d01ae1a29668f10cd0d48ce63c5',
            clientSecret: 'loPNjPclsqwjbLakUNN2uYSzJi57SdXg',
            async profile(profile) {
                return {
                    id: profile.id,
                    name: profile.kakao_account?.profile?.nickname,
                    email: profile.kakao_account?.email,
                    image: profile.kakao_account?.profile?.profile_image_url,
                }
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub
            return session
        }
    }
}
export default NextAuth(authOptions)