import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { saveUserFromGoogle } from "./saveUser";

// Auth handler config
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: credentials.phone,
            otp: credentials.otp,
          }),
        });

        const data = await res.json();

        if (!data.success) return data;

        // Return user object → goes into JWT & session
        return {
          id: data.userId,
          phone: credentials.phone,
          name: null,
          email: null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      // Handle new login (Google or OTP)
      if (user) {
        token.id = user.id ?? token.id;
        token.phone = user.phone ?? token.phone;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
      }

      // Google login
      if (account && profile && account.provider === "google") {
        await saveUserFromGoogle(profile);
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
      }

      // Handle session.update()
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
        if (session.phone) token.phone = session.phone;
      }

      return token;
    },

    async session({ session, token }) {
      // Expose token.id inside the session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
        session.user.name = token.name as string | null;
        session.user.email = token.email as string | null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export { authOptions };
