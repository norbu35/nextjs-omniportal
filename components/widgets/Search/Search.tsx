'use client';

import { useState } from 'react';
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import { StaticImageData } from 'next/image';

import iconGoogle from '/public/widgets/Search/icon-google.png';
import iconBing from '/public/widgets/Search/icon-bing.png';

import styles from './Search.module.scss';

interface SearchEngine {
  value: string;
  label: string;
  icon: StaticImageData;
  url: string;
}

const searchEngines: SearchEngine[] = [
  {
    value: 'google',
    label: 'Google',
    icon: iconGoogle,
    url: 'https://www.google.com',
  },
  {
    value: 'bing',
    label: 'Bing',
    icon: iconBing,
    url: 'https://www.bing.com',
  },
];

function inputIcon(icon: StaticImageData): CSSObjectWithLabel {
  return ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundImage: `url(${icon.src})`,
      backgroundSize: 'cover',
      content: '""',
      marginRight: 5,
      height: 20,
      width: 20,
    },
  });
}

const optionStyles: StylesConfig<SearchEngine> = {
  option: (provided, { data }) => ({
    ...provided,
    alignItems: 'center',
    display: 'flex',
    padding: '5px',

    ':before': {
      backgroundImage: `url(${data.icon.src})`,
      backgroundSize: 'cover',
      content: '""',
      marginRight: 5,
      height: 20,
      width: 20,
    },
  }),
  control: (provided) => ({ ...provided, backgroundColor: 'white' }),
  singleValue: (provided, { data }) => ({ ...provided, ...inputIcon(data.icon) }),
};

function Search(): JSX.Element {
  const [defaultSearchEngine] = useState<SearchEngine>(searchEngines[0]);
  const [searchEngine, setSearchEngine] = useState<SearchEngine>(defaultSearchEngine);
  const [query, setQuery] = useState<string>('');

  function handleSearch(): void {
    let params = new URLSearchParams();
    if (searchEngine.value === 'google' || searchEngine.value === 'bing') {
      params.append('q', query);
    }

    window.open(`${searchEngine.url}/search?${params.toString()}`, '_blank');
  }

  function handleSearchEngineChange(option: SearchEngine): void {
    setSearchEngine(option);
  }

  return (
    <div className={styles.container}>
      <input className={styles.input} type='text' value={query} onChange={e => setQuery(e.target.value)} />
      <Select
        defaultValue={defaultSearchEngine}
        options={searchEngines}
        styles={optionStyles}
        onChange={(newValue) => handleSearchEngineChange(newValue)}
        className={styles.engineOptions}
      />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export { Search };
export default Search;
