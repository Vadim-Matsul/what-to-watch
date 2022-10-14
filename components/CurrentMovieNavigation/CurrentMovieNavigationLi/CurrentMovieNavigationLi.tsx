import { CurrentMovieNavigationLiProps } from './CurrentMovieNavigationLi.props'
import classNames from 'classnames';

export const CurrentMovieNavigationLi: React.FC<CurrentMovieNavigationLiProps> = (props) => {

  const { item, active, changeActiveItem } = props;

  const itemClass = classNames('movie-nav__item', {
    'movie-nav__item--active': item === active
  });

  return (
    <li
      className={itemClass}
      onClick={() => changeActiveItem(item)}
    >
      <a href="#" className="movie-nav__link">{item}</a>
    </li>
  )
}