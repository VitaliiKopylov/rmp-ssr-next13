'use client';

import { usePathname, useRouter } from 'next/navigation';

import SearchForm from '@components/SearchForm';
import styles from './styles.module.scss';

const AppHero = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // @ts-ignore
  const searchParamsURL = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const router = useRouter();

  const setSearchTerm = (term: string) => {
    searchParamsURL.set('search', term);
    router.push(`${pathname}?${searchParamsURL}`);
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className="hero-title">Find your movie</h1>
        <SearchForm
          initialValue={searchParamsURL.get('search') || ''}
          onSearch={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default AppHero;
