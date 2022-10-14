import { optionsMenu } from '../../MovieInformation/MovieInformation';

export interface CurrentMovieNavigationLiProps {
  item: optionsMenu,
  active: optionsMenu,
  changeActiveItem: (item: optionsMenu) => void
}