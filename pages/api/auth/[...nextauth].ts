import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Bookshelf',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'karl@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const payload = {
          auth: {
            email: credentials.email,
            password: credentials.password,
          }
        };
        const res = await fetch(process.env.API_URI + '/v1/user_token', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        });

        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.exception);
        }

        if (res.ok && user) {
          return user;
        }

        return false;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.jwt,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: '/vercel.svg',
  },
});