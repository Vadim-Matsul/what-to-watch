import { CurrentMovieNavigationLiProps } from './CurrentMovieNavigationLi.props'
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../../../store/labouring/actions/actions';
import classNames from 'classnames';
import { getActiveMovieItem } from '../../../store/reducers/index.selectors';

export const CurrentMovieNavigationLi: React.FC<CurrentMovieNavigationLiProps> = ({ item }) => {

  const dispatch = useDispatch();
  const active = useSelector(getActiveMovieItem);

  const itemClass = classNames('movie-nav__item', { 'movie-nav__item--active': item === active });
  const handleChangeActiveItem = () => dispatch(ACTIONS.setActiveMovieItem(item));


  return (
    <li
      className={itemClass}
      onClick={handleChangeActiveItem}
    >
      <span className="movie-nav__link">{item}</span>
    </li>
  );
};
