// 'use client';

import styles from './styles.module.scss';
import MovieTile from '@/components/MovieTile';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { IMovieDetails } from '@/types';

async function getData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  let list: IMovieDetails[];

  const searchParamsURL = new URLSearchParams('limit=24&searchBy=title&sortOrder=asc');

  // const searchQuery = searchParamsParced.get('search')
  //   ? '&search=' + searchParamsParced.get('search')
  //   : '';
  if ('search' in searchParams) {
    // @ts-ignore
    searchParamsURL.set('search', searchParams.search);
  }
  // const filterQuery = searchParamsParced.get('filter')
  //   ? '&filter=' + searchParamsParced.get('filter')
  //   : '';
  if ('filter' in searchParams) {
    // @ts-ignore
    searchParamsURL.set('filter', searchParams.filter);
  }
  // const sortQuery = searchParamsParced.get('sortBy')
  //   ? '&sortBy=' + searchParamsParced.get('sortBy')
  //   : 'release_date';

  console.log('parsed::::', searchParamsURL.toString());

  const queryUrl = `?${searchParamsURL.toString()}`;
  try {
    const result = await fetch(`http://localhost:4000/movies${queryUrl}`);
    const { data } = await result.json();
    // console.log('PARAMS::::', searchParams);
    list = data;
  } catch (err) {
    list = [];
  }
  return list;
}

const MovieList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const moviesList = await getData(searchParams);

  // console.log('LIST:::::', moviesList, searchParams);

  // const router = useRouter();

  // Movies Select
  const goToActiveMovie = (id: string) => {
    console.log(id);
    // router.push(`/${id}?${searchParams}`);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const editMovie = (id: string) => {
    console.log(id);
    // router.push(`/${id}/edit?${searchParams}`);
  };

  return (
    <div className="container">
      <div className={styles.moviesResults} data-cy="movies-amount">
        {moviesList.length ? (
          `${moviesList.length} movies found`
        ) : (
          <div className={styles.moviesEmpty}>
            <div className="hero-title" data-cy="empty-title">
              No movies found
            </div>
          </div>
        )}
      </div>
      <div className={styles.moviesCards}>
        {moviesList.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            // onMovieClick={() => goToActiveMovie(movie.id as string)}
            // onMovieEdit={() => editMovie(movie.id as string)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
