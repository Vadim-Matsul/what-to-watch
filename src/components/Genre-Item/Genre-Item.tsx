import { GenreItemProps } from './Genre-Item.props';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveGenre } from '../../store/reducers/app-reducer/app-slice-selectors';
import { ACTIONS } from '../../store/labouring/actions/actions';
import { RootState } from '../../store/store.types';

export const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
  const active_genre = useSelector(getActiveGenre);
  const dispatch = useDispatch()

  const handlerChangeGenre = (evt: React.MouseEvent<HTMLLIElement>, genre: string) => {
    evt.preventDefault();

    dispatch(ACTIONS.setActiveGenre(genre));
  }

  return (
    <li
      className={`catalog__genres-item ${active_genre === genre ? 'catalog__genres-item--active' : ''} `}
      onClick={evt => handlerChangeGenre(evt, genre)}
    >
      <a href="#" className="catalog__genres-link">{genre}</a>
    </li>
  )
}