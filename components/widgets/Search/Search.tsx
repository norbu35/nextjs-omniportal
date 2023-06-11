'use client';

import { FormEvent, useEffect, useState } from 'react';
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import { StaticImageData } from 'next/image';

import iconGoogle from '/public/widgets/Search/icon-google.png';
import iconBing from '/public/widgets/Search/icon-bing.png';
import iconWikipedia from '/public/widgets/Search/icon-wikipedia.png';
import iconYoutube from '/public/widgets/Search/icon-youtube.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';
import Button from '@/components/composite/Button/Button';
import { WidgetState } from '@/components/layout/types';

interface Props {
  state: WidgetState;
}

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

function inputIcon(icon: StaticImageData): CSSObjectWithLabel {
  return {
    alignItems: 'center',
    display: 'flex',

    ':before': {
      content: '""',
      marginRight: 5,
      width: 20,
      height: 20,
      backgroundSize: 'cover',
      backgroundImage: `url(${icon.src})`,
    },
  };
}

const optionStyles: StylesConfig<SearchEngine> = {
  option: (provided, { data }) => ({
    ...provided,
    alignItems: 'center',
    display: 'flex',
    padding: '0.35em',

    ':before': {
      content: '""',
      marginRight: '0.35em',
      width: '1.25em',
      height: '1.25em',
      backgroundImage: `url(${data.icon.src})`,
      backgroundSize: 'cover',
    },
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#F1F6F9',
    border: 'none',
  }),
  singleValue: (provided, { data }) => ({
    ...provided,
    ...inputIcon(data.icon),
  }),
};

function Search({ state }: Props): JSX.Element {
  const { settings } = state;
  const [defaultSearchEngine] = useState<SearchEngine>(
    searchEngines.find(
      (engine) => settings.defaultSearchEngine.value === engine.label,
    ) ?? searchEngines[0],
  );
  const [searchEngine, setSearchEngine] =
    useState<SearchEngine>(defaultSearchEngine);
  const [query, setQuery] = useState<string>('');

  function handleSearch(e: FormEvent): void {
    e.preventDefault();

    let params = new URLSearchParams();
    switch (searchEngine.value) {
      case 'google':
      case 'bing':
        params.append('q', query);
        break;
      case 'wikipedia':
        params.append('search', query);
        break;
      case 'youtube':
        params.append('search_query', query);
        break;
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
      <form className={styles.searchBarContainer} onSubmit={handleSearch}>
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
        <div className={styles.button}>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Search;
