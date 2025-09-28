import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Auth handler config
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist Google ID (sub) into the token on first login
      if (account && profile) {
        token.id = profile.sub; // Google unique ID
      }
      return token;
    },
    
    async session({ session, token }) {
      // Expose token.id inside the session
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };

export { authOptions }
