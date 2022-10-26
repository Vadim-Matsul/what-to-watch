import { faker } from '@faker-js/faker';
import { appInitialState_Interface } from '../../store/reducers/app-reducer/app-types';
import { basicInitialState_Interface } from '../../store/reducers/data-reducer/basic-slice/basic-types';
import { currentSliceState_Interface } from '../../store/reducers/data-reducer/current-slice/current-types';
import { dataReducerInterface } from '../../store/reducers/data-reducer/data-reducer.combine';
import { AuthStatus, userInitialState_Interface } from '../../store/reducers/user-reducer/user-types';
import { Movie, Movies, optionsMenu } from '../../types/movies';
import { Reviews } from '../../types/reviews';
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
export const makeDataCurrentSlice = (
  current_movie: Movie | null = createMovie(),
  current_movie_reviews: Reviews = createReviews(),
  status: Status = 'none'
): Record<'current', currentSliceState_Interface> => ({
  current: { current_movie, current_movie_reviews, status }
});

/** store/data */
export const makeData = (): dataReducerInterface => (
  {
    basic: { ...create_mock_Data_Basic() },
    ...makeDataCurrentSlice()
  }
);

/** store/app */
export const makeAppSlice = (
  active_genre: string = 'Adventure',
  active_movie_item: optionsMenu = 'Details',
  active_fav_id: number = faker.datatype.number(),
): Record<'app', appInitialState_Interface> => (
  { app: { active_genre, active_movie_item, active_fav_id } }
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
  ...makeAppSlice(),
  ...makeUserSlice(),
}


