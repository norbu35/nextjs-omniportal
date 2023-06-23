'use client';
/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import '@fontsource/inter';
import { SessionProvider } from 'next-auth/react';

import 'normalize.css/normalize.css';
const Widgets = dynamic(() => import('../components/layout/Widgets/Widgets'), {
  ssr: false,
});

const Home = () => {
  return (
    <SessionProvider>
      <main>
        <Widgets />
      </main>
    </SessionProvider>
  );
};

export default Home;
