import { StaticImageData } from 'next/image';

import iconGoogle from '/public/widgets/Search/icon-google.png';
import iconBing from '/public/widgets/Search/icon-bing.png';
import iconWikipedia from '/public/widgets/Search/icon-wikipedia.png';
import iconYoutube from '/public/widgets/Search/icon-youtube.png';

interface SearchEngine {
  readonly value: string;
  readonly label: string;
  readonly icon: StaticImageData;
  readonly url: string;
}

const searchEngines: SearchEngine[] = [
  {
    value: 'google',
    label: 'Google',
    icon: iconGoogle,
    url: 'https://www.google.com/search',
  },
  {
    value: 'bing',
    label: 'Bing',
    icon: iconBing,
    url: 'https://www.bing.com/search',
  },
  {
    value: 'wikipedia',
    label: 'Wikipedia',
    icon: iconWikipedia,
    url: 'https://en.wikipedia.org/w/index.php',
  },
  {
    value: 'youtube',
    label: 'YouTube',
    icon: iconYoutube,
    url: 'https://www.youtube.com/results',
  },
];

export { searchEngines };
export type { SearchEngine };
