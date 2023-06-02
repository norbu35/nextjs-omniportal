import { Dispatch, SetStateAction } from 'react';
import WidgetSettings from '@/components/layout/Widgets/WidgetSettings';
import styles from './ClockSettings.module.scss';

interface Props {
  settingsState: ClockSettingsType;
  setSettingsState: Dispatch<SetStateAction<ClockSettingsType>>;
}

export interface CommonSettings {
  fontSize: number;
}

export interface ClockSettingsType extends CommonSettings {
  fontSize: number;
}

function ClockSettings({ settingsState, setSettingsState }: Props) {
  return (
    <WidgetSettings<ClockSettingsType>
      settingsState={settingsState}
      setSettingsState={setSettingsState}
    />
  );
}

export default ClockSettings;
