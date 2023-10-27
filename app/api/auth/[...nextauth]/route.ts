import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@/app/api/database";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    signIn: async ({ user }) => {
      await sql`
        INSERT INTO user_profile (id, name) 
          VALUES (${user.id}, ${user.name ?? `User@${user.id}`})
        ON CONFLICT (id) 
          DO UPDATE SET name = ${user.name ?? `User@${user.id}`};
      `;
      return true;
    },
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
