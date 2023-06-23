import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { WidgetState } from '@/components/layout/types';
import { MotdSettings } from '@/components/layout/Window/settingsMap';
import styles from './Motd.module.scss';

interface Props {
  state: WidgetState<MotdSettings>
}

function Motd({ state }: Props) {
  const { settings } = state;
  const [greeting, setGreeting] = useState<string | null>('Hello');
  const { data: session } = useSession();

  useEffect(() => {
    const time = new Date().getHours();
    if (time > 0 && time < 12) {
      setGreeting('Good morning');
    }
    if (time > 12 && time < 18) {
      setGreeting('Good afternoon');
    }
    if (time > 18) {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div className={styles.container} style={{ color: settings.fontColor.value, fontSize: settings.fontSize.value }}>
      {session && (
        <div className={styles.greeting}>
          {greeting}, {session.user!.name}
        </div>
      )}
    </div>
  );
}

export default Motd;
