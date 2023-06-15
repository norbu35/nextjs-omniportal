'use client';

import { FormEvent, useState } from 'react';
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import DOMPurify from 'dompurify';
import { StaticImageData } from 'next/image';

import { SearchEngine, searchEngines } from './searchEngines';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';
import Button from '@/components/composite/Button/Button';
import { WidgetState } from '@/components/layout/types';
import { SearchSettings } from '@/components/layout/Window/settingsMap';

interface Props {
  state: WidgetState<SearchSettings>;
}

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
  const defaultEngine =
    searchEngines.find(
      (engine) => settings.defaultSearchEngine.value === engine.label,
    ) || searchEngines[0];
  const [defaultSearchEngine] = useState<SearchEngine>(defaultEngine);
  const [searchEngine, setSearchEngine] =
    useState<SearchEngine>(defaultSearchEngine);
  const [query, setQuery] = useState<string>('');

  function handleSearch(e: FormEvent): void {
    e.preventDefault();

    const sanitizedQuery = DOMPurify.sanitize(query);
    const params = new URLSearchParams({
      [searchEngine.searchParam]: sanitizedQuery,
    });

    window.open(
      `${searchEngine.url}?${params.toString()}`,
      '_blank',
      'noopener noreferrer',
    );
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
          style={{ color: settings.fontColor.value }}
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
