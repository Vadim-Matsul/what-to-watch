import { faker } from '@faker-js/faker';
import { Movie, Movies } from '../../types/movies';
import { Review, Reviews, User } from '../../types/reviews';


/**
 *  Movie
 */

export const createMovie = (
  isFavorite = false
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
  id: faker.datatype.number({ min: 1, max: 2000 }),
  isFavorite: isFavorite,
  videoLink: 'https://www.youtube.com/watch?v=fKopy74weus',
  previewVideoLink: 'https://www.youtube.com/watch?v=fKopy74weus',
});

export const createMovies = (isFavorite = false): Movies => new Array(10).fill(createMovie(isFavorite));

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

export const createReviews = (): Reviews => new Array(5).fill(createReview());
