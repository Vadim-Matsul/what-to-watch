import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeAppSlice, makeDataCurrentSlice, makeUserSlice, mock_RootStore } from './store-examples';
import UserEvent from '@testing-library/user-event';
import { createMockRouter } from './mockRouter';
import { HOC_withProviders } from './HOC_withProviders';
import { faker } from '@faker-js/faker'

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
  storeExamples: {
    root: mock_RootStore,
    makeDataCurrentSlice,
    makeAppSlice,
    makeUserSlice
  }
};

