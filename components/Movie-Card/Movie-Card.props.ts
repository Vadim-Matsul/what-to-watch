import React from 'react';

export interface MovieCardProps {
  imgTitle: string,
  previewImage: string,
  id: number,
  onTitleClick: (evt: React.MouseEvent<HTMLHeadingElement>) => void,
  onCardHover: (movie: string) => void
}