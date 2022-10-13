import React from 'react';

export interface MovieCardProps {
  imgTitle: string,
  previewImage: string,
  onTitleClick: (evt: React.MouseEvent<HTMLHeadingElement>) => void,
  onCardHover: (movie: string) => void
}