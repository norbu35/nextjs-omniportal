'use client';

import { useState } from 'react';
import defaultImg from '/public/widgets/Banner/banner.jpg';
import { BannerSettings } from '@/components/layout/Window/settingsMap';
import { WidgetState } from '@/components/layout/types';
import styles from './Banner.module.scss';

interface Props {
  state: WidgetState<BannerSettings>;
}

function Banner({ state }: Props) {
  const { settings } = state;
  const [bgImg, setBgImg] = useState(defaultImg.src);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgImg})` }}
    />
  );
}

export default Banner;
