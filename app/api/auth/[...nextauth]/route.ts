/* eslint-disable import/no-extraneous-dependencies */
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'password',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'jdoe@example.com' },
        password: { label: 'Password', type: 'password', placeholder: 'hunter2' },
      },
      async authorize(credentials, req) {
        console.log('credentials ', credentials, '\nreq', req);
        return { id: '1', name: 'Admin', email: 'admin@admin.com' };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
