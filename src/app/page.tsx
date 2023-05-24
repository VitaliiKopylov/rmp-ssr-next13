import MovieFilters from '@/components/MovieFilters';
import MovieList from '@/components/MovieList';
import AppHero from '@/components/AppHero/AppHero';

export default function Page({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <AppHero searchParams={searchParams} />
      <MovieFilters searchParams={searchParams} />
      {/* @ts-expect-error Server Component */}
      <MovieList searchParams={searchParams} />
    </>
  );
}

// export default AppHero;
