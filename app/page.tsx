'use client';
import dynamic from 'next/dynamic';

import { useState } from 'react';
import { Header } from '@/components/layout/Header/Header';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css/normalize.css';

const Widgets = dynamic(() => import('../components/layout/Widgets/Widgets'), {
  ssr: false,
});

function Home(): JSX.Element {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
    <>
      <main style={{ height: '100vh' }}>
        <Header isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
        <Widgets isUnlocked={isUnlocked} />
      </main>
    </>
  );
}

export { Home };
export default Home;
