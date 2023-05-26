import { AppState } from '../types';
import { Dispatch, SetStateAction } from 'react';
import styles from './WidgetsSettings.module.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@/components/composite/Button/Button';

interface Props {
  state: [AppState, Dispatch<SetStateAction<AppState>>]
  lock: [boolean, () => void],
  collision: [boolean, () => void]
  border: [boolean, () => void]
}

interface BasicOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

interface GroupedOption {
  readonly label: string;
  readonly options: readonly BasicOption[];
}

function WidgetsSettings({
  state,
  lock,
  collision,
  border,
}: Props) {
  const [appState, setAppState] = state;
  const [isUnlocked, setIsUnlocked] = lock;
  const [isCollision, setIsCollision] = collision;
  const [isBorder, setIsBorder] = border;

  const animatedComponents = makeAnimated();
  const basicOptions: readonly BasicOption[] = Object.keys(appState.widgets).map<{
    value: string;
    label: string;
  }>((key) => ({
    value: key,
    label: `${key.charAt(0).toUpperCase()}${key.slice(1)}`,
  }));
  const groupedOptions: readonly GroupedOption[] = [
    {
      label: 'Basic Widgets',
      options: basicOptions,
    },
  ];
  
  return (
    <div className={styles.container}>
      <Button type="button" onClick={setIsUnlocked} variant="primary">
        {isUnlocked ? 'Lock' : 'Unlock'}
      </Button>
      <Button type="button" onClick={setIsCollision} variant="primary">{isCollision ? 'Disable collision' : 'Enable collision'}</Button>
      <Button type="button" onClick={setIsBorder} variant="primary">{isBorder ? 'Hide borders' : 'Show borders'}</Button>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={basicOptions.filter(
          (option) => appState.widgets[option.value]?.window?.isVisible === true,
        )}
        isMulti
        options={groupedOptions}
        onChange={(selectedOptions) => {
          const updatedStates = { ...appState };
          selectedOptions.forEach((option) => {
            updatedStates.widgets[option.value].window.isVisible = true;
          });
          basicOptions.forEach((option) => {
            if (
              !selectedOptions.find(
                (selectedOption) => selectedOption.value === option.value,
              )
            ) {
              updatedStates.widgets[option.value].window.isVisible = false;
            }
          });
          setAppState(updatedStates);
        }}
      />
    </div>
  );
}

export { WidgetsSettings };
export default WidgetsSettings;
