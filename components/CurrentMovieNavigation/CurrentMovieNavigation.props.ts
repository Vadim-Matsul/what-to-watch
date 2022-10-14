import { optionsMenu } from '../MovieInformation/MovieInformation';

export interface CurrentMovieNavigationProps {
  active: optionsMenu,
  changeActiveItem: (item: optionsMenu) => void
}