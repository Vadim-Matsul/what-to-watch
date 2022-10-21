import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bePagesPaths, FavoritesStatus } from '../../helpers/const/const';
import { useAppDispatch } from '../../helpers/Hooks/useAppDispatch';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { getAuthStatus } from '../../store/reducers/user-reducer/user-slice-selectors';
import { movieFavoriteData } from '../../types/movies';
import { MovieButtonsProps } from './MovieButtons.props';


export const MovieButtons: React.FC<MovieButtonsProps> = ({ isFavorite, movieId }) => {

  const authStatus = useSelector(getAuthStatus);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [chosen, setChosen] = useState<boolean>(isFavorite);

  useEffect(() => {
    if (authStatus === 'NOAUTH') { setChosen(false); return; }
    setChosen(isFavorite);
  }, [isFavorite, authStatus])



  const handleAddInFavorites = async () => {
    if (authStatus === 'NOAUTH') { router.push(bePagesPaths.login); return }
    const movieData: movieFavoriteData = {
      id: movieId,
      status: chosen ? FavoritesStatus.DELETE : FavoritesStatus.ADD
    };
    await dispatch(API_ACTIONS.changeFavorites(movieData));
    setChosen(prev => !prev);
  };

  return (
    <>
      <Link href={bePagesPaths.player.replace(/id/g, String(movieId))}  >
        <a className="btn btn--play movie-card__button">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s" />
          </svg>
          <span>Play</span>
        </a>
      </Link>

      <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick={handleAddInFavorites}
      >
        {chosen
          ? <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list" />
          </svg>
          : <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add" />
          </svg>
        }
        <span>My list</span>
      </button>
    </>
  );
};
