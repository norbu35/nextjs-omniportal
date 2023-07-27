'use client';

import { useEffect, useState } from 'react';
import styles from './Clock.module.css';
import { WidgetState } from '@/components/layout/types';
import { ClockSettings } from '@/components/layout/Window/settingsMap';

interface Props {
  state: WidgetState<ClockSettings>;
}

export default function Clock({ state }: Props) {
  const { settings } = state;
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const date = new Date();
      const timeStr = date.toLocaleTimeString('en-US', {
        hour12: settings.format.value === '12h' ? true : false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(timeStr);
    }
    update();
    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.format.value]);

  return (
    <div
      className={styles.container}
      style={{
        fontSize: (settings.fontSize.value / 16).toFixed(3) + 'rem',
        color: settings.fontColor.value,
      }}
    >
      <div className={styles.hour}>{time}</div>
    </div>
  );
}
