/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import '@fontsource/inter';

import 'normalize.css/normalize.css';

const Widgets = dynamic(() => import('../components/layout/Widgets/Widgets'), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <main>
        <Widgets />
      </main>
    </>
  );
};

export default Home;
