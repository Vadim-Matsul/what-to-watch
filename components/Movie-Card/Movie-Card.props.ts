import React from 'react';

export interface MovieCardProps {
  imgTitle: string,
  posterImage: string,
  previewLink: string,
  id: number,
  isFavorite?: boolean
}