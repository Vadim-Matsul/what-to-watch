import { CurrentMovieNav } from '../../helpers/const/const'
import { CurrentMovieNavigationProps } from './CurrentMovieNavigation.props'
import { CurrentMovieNavigationLi } from './CurrentMovieNavigationLi/CurrentMovieNavigationLi'


export const CurrentMovieNavigation: React.FC<CurrentMovieNavigationProps> = (props) => {
  const { active, changeActiveItem } = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {CurrentMovieNav.map(item =>
          <CurrentMovieNavigationLi
            item={item}
            active={active}
            key={item}
            changeActiveItem={changeActiveItem}
          />
        )}
      </ul>
    </nav>
  )
}