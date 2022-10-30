import { waitFor } from '@testing-library/react';
import { testBundle } from '../../z_tests-helper/testBundle';
import { MovieButtonToggle } from './MovieButtonToggle';

const {
  render,
  screen,
  fireEvent,
} = testBundle;

describe('Component: MovieButtonToggle', () => {

  it('Корректный рендер', () => {
    const fakeToggler = jest.fn();
    const {
      getByTestId, queryByText, getByText,
      rerender,
    } = render(
      <MovieButtonToggle
        isPlaying={true}
        changePlayingState={fakeToggler}
      />
    );

    expect(queryByText(/Play/i)).toBeNull();
    expect(getByText(/Pause/i)).toBeInTheDocument();

    getByTestId('toggler').focus();

    expect(fakeToggler).not.toBeCalled();
    fireEvent.click(document.activeElement!)

    waitFor(() => expect(fakeToggler).toBeCalledTimes(1), { timeout: 100 });

    rerender(
      <MovieButtonToggle
        isPlaying={false}
        changePlayingState={fakeToggler}
      />
    );
    
    expect(getByText(/Play/i)).toBeInTheDocument();
    expect(queryByText(/Pause/i)).toBeNull();
  });

});
