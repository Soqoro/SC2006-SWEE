import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
//import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    /*CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = { id: 1, name: "J Smith", email: "}@example.com" };
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),*/
  ],
});

export { handler as GET, handler as POST };
