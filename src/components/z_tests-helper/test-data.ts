import { faker } from '@faker-js/faker';
import { Movie, MovieInformation, Movies } from '../../types/movies';
import { Review, ReviewFormData, Reviews, User } from '../../types/reviews';
import { LoginData, UserData } from '../../types/user';


/**
 *  Movie
 */

export const createMovie = (
  isFavorite = false,
  id: number = faker.datatype.number({ min: 1, max: 2000 })
): Movie => ({
  name: faker.commerce.productName(),
  posterImage: faker.image.imageUrl(),
  previewImage: faker.image.image(),
  backgroundImage: faker.image.image(),
  backgroundColor: faker.color.rgb(),
  description: faker.commerce.productDescription(),
  rating: faker.datatype.number({ min: 1, max: 10 }),
  scoresCount: faker.datatype.number({ min: 765, max: 9391 }),
  director: faker.name.fullName(),
  starring: new Array(3).fill(faker.name.firstName()),
  runTime: faker.datatype.number({ min: 30, max: 150 }),
  genre: faker.commerce.productAdjective(),
  released: faker.datatype.number({ min: 1970, max: 2022 }),
  id: id,
  isFavorite: isFavorite,
  videoLink: 'https://www.youtube.com/watch?v=fKopy74weus',
  previewVideoLink: 'https://www.youtube.com/watch?v=fKopy74weus',
});

export const createMovies = (isFavorite = false, count = 10): Movies => new Array(count).fill(null).map((movie, i) => createMovie(isFavorite, i + 1));


export const makeMovieInformation = (): MovieInformation => ({
  name: faker.commerce.productName(),
  posterImage: faker.image.imageUrl(),
  description: faker.commerce.productDescription(),
  rating: faker.datatype.number({ min: 1, max: 10 }),
  scores_count: faker.datatype.number({ min: 1341, max: 8497 }),
  director: faker.name.fullName(),
  starring: new Array(3).fill(faker.name.firstName()),
  run_time: faker.datatype.number({ min: 20, max: 180 }),
  genre: faker.commerce.productAdjective(),
  released: faker.datatype.number({ min: 1990, max: 2022 }),
  is_favorite: false,
  video_link: 'https://www.youtube.com/watch?v=fKopy74weus',
});

/**
 *  Review
 */

export const createUser = (): User => ({
  id: Number(faker.datatype.uuid()),
  name: faker.name.firstName(),
});

export const createReview = (): Review => ({
  id: Number(faker.datatype.uuid()),
  rating: faker.datatype.number({ min: 1, max: 10 }),
  comment: faker.commerce.productDescription(),
  date: String(new Date()),
  user: createUser(),
})

export const createReviews = (count = 5): Reviews => new Array(count).fill(createReview());

export const createFakeReviewData = (): ReviewFormData => ({
  id: faker.datatype.number({ min: 1, max: 1000 }),
  rating: faker.datatype.number({ min: 1, max: 5 }).toString(),
  comment: faker.commerce.productDescription(),
});

/** User */
export const getFakeUser = (): UserData => ({
  id: Number(faker.datatype.uuid()),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  avatarUrl: faker.image.image()
});

export const getFakeLoginData = (): LoginData => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

/** Another */
export const generateRandomId = (toString: boolean = false) => {
  const id = faker.datatype.number({ min: 1, max: 1000 });
  return toString
    ? String(id)
    : id;
} 