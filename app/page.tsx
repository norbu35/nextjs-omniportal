/* eslint-disable import/no-extraneous-dependencies */
'use client';
import dynamic from 'next/dynamic';
import '@fontsource/inter';

import { useState } from 'react';
import { Header } from '@/components/layout/Header/Header';
import 'normalize.css/normalize.css';

const Widgets = dynamic(() => import('../components/layout/Widgets/Widgets'), {
  ssr: false,
});

const Home = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
      <main>
        <Header isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
        <Widgets isUnlocked={isUnlocked} />
      </main>
  );
};

export { Home };
export default Home;
