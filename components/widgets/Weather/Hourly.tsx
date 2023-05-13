import { WeatherData } from './types';

interface Props {
  weatherData: WeatherData;
}
export default function Hourly({ weatherData }: Props) {
  const date = new Date();
  const hours = weatherData.hourly.time;
  return (
    <table>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
