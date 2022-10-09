import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MovieCard from './Movie-Card';
import { moviesTitlesMock } from '../../const';
import React from 'react';

describe('MovieCard component ', () => {

  it('Заголовок карточки фильма кликабелен', async () => {
    const title = moviesTitlesMock[0];
    const onTitleClick = jest.fn();

    expect(screen.queryByText(title)).not.toBeInTheDocument();

    render(
      <MovieCard
        img_title={title}
        onTitleClick={onTitleClick}
      />
    );

    const movie_card = screen.getByText(title);


    expect(movie_card).toBeInTheDocument();
    expect(onTitleClick).not.toBeCalled();
    await UserEvent.click(movie_card);
    expect(onTitleClick).toBeCalled();
  });


});
