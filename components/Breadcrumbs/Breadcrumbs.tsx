import Link from 'next/link';
import { useSelector } from 'react-redux'
import { bePagesPaths } from '../../helpers/const/const';
import { getCurrentMovie } from '../../store/reducers/data-reducer/current-slice/current-slice-selectors'


export const Breadcrumbs: React.FC = () => {
  const currentMovie = useSelector(getCurrentMovie);


  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link href={bePagesPaths.currentMovie.replace(`[id]`, String(currentMovie.id))} >
            <a className="breadcrumbs__link">{currentMovie.name}</a>
          </Link>
        </li>
        <li className="breadcrumbs__item">
          Add review
        </li>
      </ul>
    </nav>
  );
};
