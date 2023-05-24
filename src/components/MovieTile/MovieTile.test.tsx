import MovieTile from './MovieTile';
import { IMovie } from '../../types';
import { render, fireEvent, screen } from '@testing-library/react';

const movieMock: IMovie = {
  poster_path:
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kXTdxfgCRGg38Q90WG9iJyTYzqP.jpg',
  title: 'Shaun of the Dead',
  release_date: '2004',
  genres: ['Comedy', 'Horror'],
};

const setup = () => {
  const onClickMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onEditMock = jest.fn();
  const utils = render(
    <MovieTile
      movie={movieMock}
      onMovieClick={onClickMock}
      onMovieDelete={onDeleteMock}
      onMovieEdit={onEditMock}
    />
  );

  return {
    ...utils,
    onClickMock,
    onDeleteMock,
    onEditMock,
  };
};

describe('MovieTile component', () => {
  it('renders MovieTile component', () => {
    const { getByRole, getByText } = setup();
    expect(getByRole('img')).toHaveAttribute('src', movieMock.poster_path);
    expect(getByRole('img')).toHaveAttribute('alt', movieMock.title);
    expect(getByText(movieMock.title.toString())).toBeInTheDocument();
    expect(getByText(movieMock.release_date.toString())).toBeInTheDocument();
    expect(getByText(movieMock.genres.join(', '))).toBeInTheDocument();
  });

  it('handle all listeners correctly', () => {
    const { getByRole, getByText, onClickMock, onDeleteMock, onEditMock } =
      setup();
    const actionsBtn = getByRole('button');
    const img = getByRole('img');

    fireEvent.click(img);
    expect(onClickMock).toHaveBeenCalledTimes(1);

    fireEvent.click(actionsBtn);

    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
    fireEvent.click(getByText('Delete'));
    expect(onDeleteMock).toHaveBeenCalled();

    fireEvent.click(actionsBtn);

    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
    fireEvent.click(getByText('Edit'));
    expect(onEditMock).toHaveBeenCalled();
  });
});
