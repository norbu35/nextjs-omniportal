'use client';
/* eslint-disable import/no-extraneous-dependencies */
import { SessionProvider, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import '@fontsource/inter';

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
