'use client';

import { FormEvent, useState } from 'react';
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import DOMPurify from 'dompurify';
import { StaticImageData } from 'next/legacy/image';

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
      marginRight: 10,
      width: 30,
      height: 20,
      backgroundSize: 'cover',
      backgroundImage: `url(${icon.src})`,
    },
  };
}

export default function Search({ state }: Props): JSX.Element {
  const { settings } = state;
  const defaultEngine =
    searchEngines.find(
      (engine) => settings.defaultSearchEngine.value === engine.label,
    ) || searchEngines[0];
  const [defaultSearchEngine] = useState<SearchEngine>(defaultEngine);
  const [searchEngine, setSearchEngine] =
    useState<SearchEngine>(defaultSearchEngine);
  const [query, setQuery] = useState<string>('');

  const optionStyles: StylesConfig<SearchEngine> = {
    option: (provided, { data }) => ({
      ...provided,
      alignItems: 'center',
      display: 'flex',
      padding: '0.35em',

      ':before': {
        content: '""',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginRight: '0.35em',
        width: '1.25rem',
        height: '1.25rem',
        backgroundImage: `url(${data.icon.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: settings.optionsColor.value,
      border: 'none',
      display: 'flex',
    }),
    singleValue: (provided, { data }) => ({
      ...provided,
      ...inputIcon(data.icon),
    }),
  };

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
      <form
        className={styles.searchBarContainer}
        onSubmit={handleSearch}
        style={{
          borderColor: settings.accentColor.value,
          background: settings.backgroundColor.value,
        }}
      >
        <FontAwesomeIcon
          className={styles.icon}
          icon={faMagnifyingGlass}
          size="xs"
          style={{ color: `${settings.accentColor.value}` }}
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
