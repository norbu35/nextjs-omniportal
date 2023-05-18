'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Widgets } from '@/components/layout/Widgets/Widgets';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css/normalize.css';

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
