import { API_URI } from "@/utils/config.js";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_AUTH_LOGIN}`
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });
                    const result = await response.json()
                    if (response.status !== 200) throw result
                    return result;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },

        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/join/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user.user;
            session.token = token.user.token;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
