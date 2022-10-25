import { appInitialState_Interface } from '../../store/reducers/app-reducer/app-types';
import { basicInitialState_Interface } from '../../store/reducers/data-reducer/basic-slice/basic-types';
import { currentSliceState_Interface } from '../../store/reducers/data-reducer/current-slice/current-types';
import { dataReducerInterface } from '../../store/reducers/data-reducer/data-reducer.combine';
import { AuthStatus, userInitialState_Interface } from '../../store/reducers/user-reducer/user-types';
import { Movies, optionsMenu } from '../../types/movies';
import { Status, UserData } from '../../types/user';
import { createMovie, createMovies, createReviews } from './test-data';


/** store/data/basic */
export const create_mock_Data_Basic = (
  fav: Movies = [],
  isFavoriteMovies: boolean = false,
  count: number = 10
): basicInitialState_Interface => ({
  movies: createMovies(isFavoriteMovies, count),
  movie_cover: createMovie(),
  favorites_movies: fav,
  status: 'none'
});

/** store/data/current */
export const create_mock_Data_Current = (): currentSliceState_Interface => ({
  current_movie: createMovie(),
  current_movie_reviews: createReviews(),
  status: 'none'
});

/** store/data */
export const makeData = (): dataReducerInterface => (
  {
    basic: { ...create_mock_Data_Basic() },
    current: { ...create_mock_Data_Current() }
  }
);

/** store/app */
export const makeApp = (
  active_movie_item: optionsMenu = 'Details'
): appInitialState_Interface => (
  {
    active_genre: 'Adventure',
    active_movie_item,
    active_fav_id: 1
  }
);

/** store/user */

export const makeUserSlice = (
  authStatus: AuthStatus = 'UNKNOWN',
  user: UserData | null = null,
  status: Status = 'none'
): Record<'user', userInitialState_Interface> => ({
  user: { authStatus, user, status }
});


/** store */
export const mock_RootStore = {
  data: makeData(),
  app: makeApp(),
}


