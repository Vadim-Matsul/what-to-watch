import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeDataBasicSlice, makeAppSlice, makeDataCurrentSlice, makeUserSlice, makeRootState } from './store-examples';
import UserEvent from '@testing-library/user-event';
import { createMockRouter } from './mockRouter';
import { HOC_withProviders } from './HOC_withProviders';
import { faker } from '@faker-js/faker'
import { createMovie, createMovies, createReview, createReviews, getFakeUser as createFakeUser } from './test-data';

export const makeFakeStore = configureMockStore();

export const testBundle = {
  faker,
  render,
  screen,
  fireEvent,
  UserEvent,
  makeFakeStore,
  createMockRouter,
  HOC_withProviders,
  creators: {
    createMovie,
    createMovies,
    createReview,
    createReviews,
    createFakeUser,
  },
  storeExamples: {
    makeRootState,
    makeDataCurrentSlice,
    makeDataBasicSlice,
    makeAppSlice,
    makeUserSlice,
  },
  createBubbleEvent,
};

// Создание bubbles event ( в браузере события всплывают )
// для теста drag and drop;
function createBubbleEvent(type: string, props: Record<string, unknown> = {}) {
  return Object.assign(new Event(type, { bubbles: true }), props);
};

const event = new Event('scroll', {
  bubbles: true,
  
})
