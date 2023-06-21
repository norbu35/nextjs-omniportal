import capitalize from '@/utils/string/capitalize';
import styles from './Weather.module.scss';

interface Props {
  activeTab: TabType;
  handleSwitchTab: (tab: TabType) => void;
}

const tabs = ['hourly', 'daily', 'precipitation'] as const;
type TabType = (typeof tabs)[number];

function TabsNav({ activeTab, handleSwitchTab }: Props) {
  return (
    <ul className={styles.tabsNav}>
      {tabs.map((tab) => {
        return (
          <li
            className={
              activeTab === tab
                ? `${styles.tabActive} ${styles.tabButton}`
                : `${styles.tabButton}`
            }
            onClick={() => handleSwitchTab(tab as TabType)}
            key={tab}
          >
            {capitalize(tab)}
          </li>
        );
      })}
    </ul>
  );
}

export default TabsNav;
export type { TabType };
