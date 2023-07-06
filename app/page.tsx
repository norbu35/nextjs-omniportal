'use client';
/* eslint-disable import/no-extraneous-dependencies */
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { FileSelectionContextProvider } from '@/components/composite/DropZone/FileSelectionContext';
import '@fontsource/inter';

import 'normalize.css/normalize.css';
const Widgets = dynamic(() => import('../components/layout/Widgets/Widgets'), {
  ssr: false,
});

const Home = () => {
  return (
    <SessionProvider>
      <FileSelectionContextProvider>
      <main>
        <Widgets />
      </main>
      </FileSelectionContextProvider>
    </SessionProvider>
  );
};

export default Home;
