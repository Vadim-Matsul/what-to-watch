import React from 'react';
import { Movie } from '../../types/movies';

export interface MoviePlayerProps {
  movie: Movie
}

export interface PlayerTimeProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>
}

export interface isVideoTarget {
  target: HTMLVideoElement
}