'use client';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';
import { IconContext } from 'react-icons';

import { useState } from 'react';
import BaseImage from '@components/BaseImage';

import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { IMovie, IOption } from '../../types';
import styles from './styles.module.scss';

interface MovieTileProps {
  movie: IMovie;
  // onMovieClick: () => void;
  // onMovieDelete: () => void;
  // onMovieEdit: () => void;
}

const MovieTile = ({
  movie,
}: // onMovieClick,
// onMovieDelete,
// onMovieEdit,
MovieTileProps) => {
  const { poster_path, title, release_date, genres } = movie;
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const searchParamsURL =
    searchParams.toString() !== '' ? `?${searchParams.toString()}` : '';

  const optionSelected = (option: IOption) => {
    // if (option.value === 'delete') onMovieDelete();
    // if (option.value === 'edit') onMovieEdit();
    setOpen(false);
  };

  const router = useRouter();

  return (
    <div
      className={styles.movieTile}
      onMouseLeave={() => setOpen(false)}
      data-anim="movie-tile"
    >
      <div className={styles.movieTile__top}>
        <Link href={`/${movie.id}${searchParamsURL}`}>
          <BaseImage
            className={styles.movieTile__image}
            src={poster_path as string}
            height={384}
            width={256}
            alt={title}
          />{' '}
        </Link>
        <div className={styles.movieTile__action}>
          <button
            className={styles.movieTile__btn}
            onClick={() => setOpen(true)}
          >
            <IconContext.Provider value={{ color: 'var(--white)' }}>
              <BsThreeDotsVertical />
            </IconContext.Provider>
          </button>
          {open && (
            <div className={styles.movieTile__dd}>
              <div className={styles.dd}>
                <IconContext.Provider
                  value={{
                    color: 'var(--white)',
                    className: styles.dd__closeWrapper,
                  }}
                >
                  <button
                    className={styles.dd__closeBtn}
                    onClick={() => setOpen(false)}
                  >
                    <TfiClose />
                  </button>
                </IconContext.Provider>
                <Link
                  className={styles.dd__btn}
                  href={`/${movie.id}/edit${searchParamsURL}`}
                >
                  Edit
                </Link>
                <button
                  className={styles.dd__btn}
                  onClick={() => console.log('dfsdf')}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.movieTile__info}>
        <div>
          <h2 className={styles.movieTile__title}>{title}</h2>
          <div className={styles.movieTile__genres}>{genres.join(', ')}</div>
        </div>
        <div className={styles.movieTile__year}>{release_date.slice(0, 4)}</div>
      </div>
    </div>
  );
};

export default MovieTile;
