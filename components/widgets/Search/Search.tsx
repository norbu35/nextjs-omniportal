/* eslint-disable import/no-extraneous-dependencies */
'use client';

import { useState } from 'react';
import Select, {  StylesConfig } from 'react-select';
import { StaticImageData } from 'next/image';

import iconGoogle from '/public/widgets/Search/icon-google.png';
import iconBing from '/public/widgets/Search/icon-bing.png';
import iconWikipedia from '/public/widgets/Search/icon-wikipedia.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';

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
];

function inputIcon(icon: StaticImageData)  {
  return {
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
  };
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
  singleValue: (provided, { data }) => ({
    ...provided,
    ...inputIcon(data.icon),
  }),
};

function Search(): JSX.Element {
  const [defaultSearchEngine] = useState<SearchEngine>(searchEngines[0]);
  const [searchEngine, setSearchEngine] =
    useState<SearchEngine>(defaultSearchEngine);
  const [query, setQuery] = useState<string>('');

  function handleSearch(): void {
    let params = new URLSearchParams();
    if (searchEngine.value === 'google' || searchEngine.value === 'bing') {
      params.append('q', query);
    }
    if (searchEngine.value === 'wikipedia') {
      params.append('search', query);
    }

    window.open(`${searchEngine.url}?${params.toString()}`, '_blank');
  }

  function handleSearchEngineChange(option: any): void {
    if (option) {
      setSearchEngine(option);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faMagnifyingGlass}
          size="xs"
        />
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          defaultValue={defaultSearchEngine}
          options={searchEngines}
          styles={optionStyles}
          onChange={(newValue) => handleSearchEngineChange(newValue)}
          className={styles.engineOptions}
        />
        <button className={styles.button} type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export { Search };
export default Search;
