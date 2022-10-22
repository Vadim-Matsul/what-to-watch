import { appInitialState_Interface } from '../../store/reducers/app-reducer/app-types';
import { basicInitialState_Interface } from '../../store/reducers/data-reducer/basic-slice/basic-types';
import { currentSliceState_Interface } from '../../store/reducers/data-reducer/current-slice/current-types';
import { dataReducerInterface } from '../../store/reducers/data-reducer/data-reducer.combine';
import { Movies, optionsMenu } from '../../types/movies';
import { createMovie, createMovies, createReviews } from './test-data';


/** store/data/basic */
export const create_mock_Data_Basic = (fav: Movies = []): basicInitialState_Interface => ({
  movies: createMovies(),
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


/** store */
export const mock_RootStore = {
  data: makeData(),
  app: makeApp(),
}


