import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { create_mock_Data_Current, makeApp, mock_RootStore } from './store-examples';
import { Provider } from 'react-redux';
import UserEvent from '@testing-library/user-event';


const makeFakeStore = configureMockStore();

export const testBundle = {
  render,
  screen,
  Provider,
  fireEvent,
  UserEvent,
  makeFakeStore,
  storeExamples: {
    root: mock_RootStore,
    onlyBasicCurrent: { data: { current: { ...create_mock_Data_Current() } } },
    onlyApp: { app: { ...makeApp() } },
  }
};
