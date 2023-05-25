import clsx from 'clsx';
import { API_URL } from '../../constants';

import MovieList from '@/components/MovieList';
import MovieDetails from '@/components/MovieDetails';
import Link from 'next/link';

interface IPageProps {
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

const MoviePage = async ({ params, searchParams }: IPageProps) => {
  const { movieId } = params;
  const movie = await fetchData(movieId);

  if (Object.keys(movie).length === 0)
    return (
      <div className="container">
        <h1 className="hero-title">Not Found Page</h1>
        <Link href="/">Go to home page</Link>
      </div>
    );

  return (
    <>
      <MovieDetails movie={movie} searchParams={searchParams} />
      {/* @ts-expect-error Server Component */}
      <MovieList searchParams={searchParams} />
    </>
  );
};

export default MoviePage;
