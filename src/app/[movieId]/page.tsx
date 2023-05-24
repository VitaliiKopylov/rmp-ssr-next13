import clsx from 'clsx';
import BaseImage from '@components/BaseImage';
import { convertMinutesToHoursAndMinutes } from '../../utils/duration';
import { API_URL } from '../../constants';

import styles from './styles.module.scss';
import MovieList from '@/components/MovieList/MovieList';
import Link from 'next/link';
import GoBack from './GoBack';

interface IPageProps {
  children: React.ReactNode;
  params: {
    movieId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function fetchData(movieId: string) {
  try {
    const result = await fetch(`${API_URL}/movies/${movieId}`);
    const data = await result.json();
    return data;
  } catch (err) {
    return {};
  }
}

const MovieDetails = async ({ children, params, searchParams }: IPageProps) => {
  const { movieId } = params;
  const movie = await fetchData(movieId);

  const {
    poster_path = '',
    title = '',
    release_date = '',
    genres = [],
    vote_average = 0,
    runtime = 0,
    overview = '',
  } = movie || {};

  if (Object.keys(movie).length === 0)
    return (
      <div className="container">
        <h1 className="hero-title">Not Found Page</h1>
        <Link href="/">
          Go to home page
        </Link>
      </div>
    );

  return (
    <article className={styles.movieDetails}>
      <div className={clsx(styles.movieDetails__inner, 'container')}>
        <GoBack searchParams={searchParams}/>
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
      {children}
      {/* @ts-expect-error Server Component */}
      <MovieList searchParams={searchParams} />
    </article>
  );
};

export default MovieDetails;
