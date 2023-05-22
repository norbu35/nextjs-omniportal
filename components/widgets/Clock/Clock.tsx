'use client';

import { useEffect, useState } from 'react';
import styles from './Clock.module.css';

function Clock() {
  const [second, setSecond] = useState<string | null>(null);
  const [minute, setMinute] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const date = new Date();
      let secondStr = date.getSeconds() < 10 ? `0${date.getSeconds().toString()}` : date.getSeconds().toString();
      let minuteStr = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
      let hourStr = date.getHours() < 10 ? `0${date.getHours().toString()}` : date.getHours().toString();
      setSecond(secondStr);
      setMinute(minuteStr);
      setHour(hourStr);
    }

    update();

    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hour}>{hour}</div>
      <div className={styles.divider}>:</div>
      <div className={styles.minute}>{minute}</div>
      <div className={styles.divider}>:</div>
      <div className={styles.second}>{second}</div>
    </div>
  );
}

export { Clock };
export default Clock;
