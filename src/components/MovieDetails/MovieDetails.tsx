'use client';

import clsx from 'clsx';
import { VscSearch } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import Link from 'next/link';

import BaseImage from '@components/BaseImage';
import { IMovieDetails } from '../../types';
import { convertMinutesToHoursAndMinutes } from '../../utils/duration';

import styles from './styles.module.scss';

interface IPageProps {
  movie: IMovieDetails;
  searchParams: { [key: string]: string | string[] | undefined };
}

const MovieDetails = ({ movie, searchParams }: IPageProps) => {
  const {
    poster_path = '',
    title = '',
    release_date = '',
    genres = [],
    vote_average = 0,
    runtime = 0,
    overview = '',
  } = movie || {};

  // @ts-ignore
  const searchParamsURL = new URLSearchParams(searchParams);

  return (
    <article className={styles.movieDetails}>
      Movie details
      <div className={clsx(styles.movieDetails__inner, 'container')}>
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
        <BaseImage
          className={styles.movieDetails__image}
          src={poster_path}
          alt={title}
          height={100}
          width={390}
        />
        <div className={styles.movieDetails__info}>
          <header className={styles.movieDetails__header}>
            <h2 className={clsx(styles.movieDetails__title, 'hero-title')}>
              {title}
            </h2>
            {vote_average && (
              <div className={styles.movieDetails__rating}>{vote_average}</div>
            )}
          </header>
          <div className={styles.movieDetails__genres}>{genres.join(', ')}</div>
          <div className={styles.movieDetails__stats}>
            <div>{release_date.slice(0, 4)}</div>
            {runtime && <div>{convertMinutesToHoursAndMinutes(runtime)}</div>}
          </div>
          <div className={styles.movieDetails__description}>{overview}</div>
        </div>
      </div>
    </article>
  );
};

export default MovieDetails;
