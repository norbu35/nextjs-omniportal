import { Rnd } from 'react-rnd';
import { WidgetStates } from '../types';

interface Props {
  widgetStates: WidgetStates;
}

function WidgetSettings({ widgetStates }: Props) {
  console.log(widgetStates);
  return (
    <Rnd
      default={{
        x: 500,
        y: 500,
        width: 400,
        height: 400,
      }}
    >
    </Rnd>
  );
}

export { WidgetSettings };
export default WidgetSettings;
