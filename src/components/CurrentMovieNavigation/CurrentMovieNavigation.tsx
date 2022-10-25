import { CurrentMovieNav } from '../../helpers/const/const'
import { CurrentMovieNavigationLi } from './CurrentMovieNavigationLi/CurrentMovieNavigationLi'


export const CurrentMovieNavigation: React.FC = () => {

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {CurrentMovieNav.map(item =>
          <CurrentMovieNavigationLi
            item={item}
            key={item}
          />
        )}
      </ul>
    </nav>
  );
};
