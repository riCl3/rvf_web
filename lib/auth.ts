// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// lib/auth.ts
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || [];
            if (user.email && allowedEmails.includes(user.email)) {
                return true;
            }
            return false;
        },
    },
    /* DELETE OR COMMENT OUT THIS SECTION TO FIX THE LOOP:
    pages: {
        signIn: "/api/auth/signin",
        error: "/api/auth/error",
    },
    */
};