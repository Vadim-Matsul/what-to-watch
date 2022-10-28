import { waitFor } from '@testing-library/react';
import React from 'react';
import { testBundle } from '../../z_tests-helper/testBundle';
import PlayerTime from './PlayerTime';

const {
  render,
  screen
} = testBundle;

describe('Component: PlayerTime', () => {
  const video = document.createElement('video');

  it('Работают необходимые функции', () => {
    const spyRound = jest.spyOn(Math, 'round');
    const spyTrunc = jest.spyOn(Math, 'trunc')

    const { rerender } = render(<PlayerTime videoRef={{ current: video }} />);
    waitFor(() => {
      expect(spyRound).toBeCalled();
      expect(spyTrunc).toBeCalled();
    });

    const stateSpy = jest.spyOn(React, 'useState');
    video.onloadedmetadata = jest.fn();
    video.ontimeupdate = jest.fn();
    rerender(<PlayerTime videoRef={{ current: video }} />);

    waitFor(() => {
      expect(video.onloadedmetadata).toBeCalled();
      expect(video.ontimeupdate).toBeCalled();
      expect(stateSpy).toBeCalledTimes(3);
    });
  });

  it('Корректная отрисовка', () => {
    const {
      getByTestId,
      getByText
    } = render(<PlayerTime videoRef={{ current: video }} />);

    expect(getByTestId('progress')).toHaveAttribute('value', '0');
    expect(getByText(/Toggler/i)).toHaveAttribute('style', 'left: 0%;');
    expect(getByText(/00:00:00/i)).toBeInTheDocument();

  });

});
