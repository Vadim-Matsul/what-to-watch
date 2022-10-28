import { GenreItemProps } from './Genre-Item.props';
import { useSelector, useDispatch } from 'react-redux';
import { ACTIONS } from '../../store/labouring/actions/actions';
import classNames from 'classnames';
import { getActiveGenre } from '../../store/reducers/index.selectors';

export const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
  const active_genre = useSelector(getActiveGenre);
  const dispatch = useDispatch();

  const handlerChangeGenre = (evt: React.MouseEvent<HTMLLIElement>, genre: string) => {
    evt.preventDefault();
    dispatch(ACTIONS.setActiveGenre(genre));
  };

  const liClass = classNames('catalog__genres-item cursor', {
    ['catalog__genres-item--active cursor-active']: active_genre === genre
  });

  return (
    <li
      className={liClass}
      onClick={evt => handlerChangeGenre(evt, genre)}
      data-testid='genre'
    >
      <span className="catalog__genres-link">{genre}</span>
    </li>
  );
};
