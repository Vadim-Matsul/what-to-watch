import { CurrentMovieNavigationLi } from './CurrentMovieNavigationLi/CurrentMovieNavigationLi'
import { CurrentMovieNav } from '../../helpers/const/const'


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
