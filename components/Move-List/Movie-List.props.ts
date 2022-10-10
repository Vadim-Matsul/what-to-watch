import React from 'react';

export interface MovieListProps {
  movies: string[],
  onTitleClick: (evt: React.MouseEvent<HTMLHeadingElement>) => void,
}

