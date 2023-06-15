import styles from './Weather.module.scss';

interface Props {
  activeTab: TabType;
  handleSwitchTab: (tab: TabType) => void;
}

const tabs = ['hourly', 'daily', 'precipitation'] as const;
type TabType = (typeof tabs)[number];

function TabsNav({ activeTab, handleSwitchTab: handleSwitchView }: Props) {
  return (
    <ul className={styles.tabsNav}>
      {tabs.map((tab) => {
        const title = `${tab.charAt(0).toUpperCase()}${tab.slice(1)}`;
        return (
          <li
            className={
              activeTab === tab
                ? `${styles.tabActive} ${styles.tabButton}`
                : `${styles.tabButton}`
            }
            onClick={() => handleSwitchView(tab as TabType)}
            key={tab}
          >
            {title}
          </li>
        );
      })}
    </ul>
  );
}

export default TabsNav;
export type { TabType };
