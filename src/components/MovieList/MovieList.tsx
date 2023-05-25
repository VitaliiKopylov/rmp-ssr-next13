import styles from './styles.module.scss';
import MovieTile from '@/components/MovieTile';
import { IMovieDetails } from '@/types';

async function getData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  let list: IMovieDetails[];

  const searchParamsURL = new URLSearchParams('limit=24&searchBy=title&sortOrder=asc');

  if ('search' in searchParams) {
    // @ts-ignore
    searchParamsURL.set('search', searchParams.search);
  }
  if ('filter' in searchParams) {
    // @ts-ignore
    searchParamsURL.set('filter', searchParams.filter);
  }
  if ('sortBy' in searchParams) {
    // @ts-ignore
    searchParamsURL.set('sortBy', searchParams.sortBy);
  }

  const queryUrl = `?${searchParamsURL.toString()}`;
  try {
    const result = await fetch(`http://localhost:4000/movies${queryUrl}`);
    const { data } = await result.json();
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
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
