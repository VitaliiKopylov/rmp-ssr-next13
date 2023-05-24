'use client';

import GenreSelect from '@/components/GenreSelect';
import SortControl from '@/components/SortControl';
import styles from './styles.module.scss';
import { Genres, IOption } from '@/types';
import { sortingOptions } from '@/constants';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const MovieFilters = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // @ts-ignore
  const searchParamsURL = new URLSearchParams(searchParams);

  // Genres filtering
  const genres = Object.values(Genres);
  const [activeGenre, setActiveGenre] = useState(
    searchParamsURL.get('filter') || Genres.All,
  );

  const setActiveGenreQuery = (genre: Genres | string) => {
    const activeGenre = genre === 'All' ? '' : genre;
    setActiveGenre(genre);
    searchParamsURL.set('filter', activeGenre);
    router.push(`${pathname}?${searchParamsURL}`);
  };

  // Sorting
  const [filterActiveOption, setFilterActiveOption] = useState<IOption>();
  useEffect(() => {
    const activeFilterOptionValue = searchParamsURL.get('sortBy');
    if (activeFilterOptionValue !== sortingOptions[0].value) {
      const activeFilterOption = sortingOptions.find(
        ({ value }) => activeFilterOptionValue === value,
      );
      setFilterActiveOption(activeFilterOption as IOption);
    }
  }, [searchParams]);
  const setActiveFilterQuery = (option: IOption) => {
    searchParamsURL.set('sortBy', option.value);
    router.push(`${pathname}?${searchParamsURL}`);
  };

  return (
    <div className="container">
      <div className={styles.moviesFilters}>
        <GenreSelect
          onSelect={setActiveGenreQuery}
          genres={genres}
          activeGenre={activeGenre}
        />
        <SortControl
          onSelected={setActiveFilterQuery}
          activeOption={filterActiveOption}
        />
      </div>
    </div>
  );
};

export default MovieFilters;
