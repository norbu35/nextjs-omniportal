import { StaticImageData } from 'next/legacy/image';

import iconGoogle from '/public/widgets/Search/icon-google.png';
import iconBing from '/public/widgets/Search/icon-bing.png';
import iconWikipedia from '/public/widgets/Search/icon-wikipedia.png';
import iconYoutube from '/public/widgets/Search/icon-youtube.png';

interface SearchEngine {
  readonly value: string;
  readonly label: string;
  readonly icon: StaticImageData;
  readonly url: string;
  readonly searchParam: string;
}

const searchEngines: SearchEngine[] = [
  {
    value: 'google',
    label: 'Google',
    icon: iconGoogle,
    url: 'https://www.google.com/search',
    searchParam: 'q',
  },
  {
    value: 'bing',
    label: 'Bing',
    icon: iconBing,
    url: 'https://www.bing.com/search',
    searchParam: 'q',
  },
  {
    value: 'wikipedia',
    label: 'Wikipedia',
    icon: iconWikipedia,
    url: 'https://en.wikipedia.org/w/index.php',
    searchParam: 'search',
  },
  {
    value: 'youtube',
    label: 'YouTube',
    icon: iconYoutube,
    url: 'https://www.youtube.com/results',
    searchParam: 'search_query',
  },
];

export { searchEngines };
export type { SearchEngine };
