'use client';

import { VscSearch } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import styles from './styles.module.scss';
import Link from 'next/link';

const GoBack = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // @ts-ignore
  const searchParamsURL = new URLSearchParams(searchParams);

  return (
    <IconContext.Provider
      value={{ color: 'var(--accent_color)', size: '28px' }}
    >
      <Link
        className={styles.movieDetails__closeBtn}
        href={`/?${searchParamsURL}`}
      >
        <VscSearch />
      </Link>
    </IconContext.Provider>
  );
};

export default GoBack;
