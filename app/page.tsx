'use client';
/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import { FileSelectionContextProvider } from '@/components/composite/DropZone/FileSelectionContext';
import '@fontsource/inter';

import 'normalize.css/normalize.css';
const Widgets = dynamic(() => import('../components/layout/Widgets/Widgets'), {
  ssr: false,
});

const Home = () => {
  return (
      <FileSelectionContextProvider>
      <main>
        <Widgets />
      </main>
      </FileSelectionContextProvider>

  );
};

export default Home;
