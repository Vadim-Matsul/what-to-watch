export interface Movie {
  name: string
  posterImage: string
  previewImage: string
  backgroundImage: string
  backgroundColor: string
  description: string
  rating: number
  scoresCount: number
  director: string
  starring: string[]
  runTime: number
  genre: string
  released: number
  id: number
  isFavorite: boolean
  videoLink: string
  previewVideoLink: string
};

export type Movies = Movie[];

export interface MovieInformation {
  name: string;
  posterImage: string;
  description: string;
  rating: number;
  scores_count: number;
  director: string;
  starring: string[];
  run_time: number;
  genre: string;
  released: number;
  is_favorite: boolean;
  video_link: string;
};

export type strng = string | string[];
export type IsDetails = Array<{ name: string, value: strng | number }[]>;
export type isOverview = Array<{ name?: string, value: strng }>;

export type optionsMenu = 'Overview' | 'Details' | 'Reviews';

export type movieFavoriteData = {
  id: number,
  status: string
};
