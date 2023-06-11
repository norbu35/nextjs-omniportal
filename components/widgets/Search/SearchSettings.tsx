import { Dispatch, SetStateAction } from 'react';
import { CommonSettings } from '../types';
import WidgetSettings from '@/components/layout/Widgets/WidgetSettings';

interface Props {
  settingsState: SearchSettingsType;
  setSettingsState: Dispatch<SetStateAction<SearchSettingsType>>;
}

export interface SearchSettingsType extends CommonSettings {
  defaultSearchEngine: string;
}

function SearchSettings({ settingsState, setSettingsState }: Props) {
  return (
    <WidgetSettings<SearchSettingsType>
      settingsState={settingsState}
      setSettingsState={setSettingsState}
    />
  );
}

export default SearchSettings;
