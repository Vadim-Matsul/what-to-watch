import { useState } from 'react'
import { CurrentMovieNavigation } from '../CurrentMovieNavigation/CurrentMovieNavigation';
import { MovieInformationProps } from './MovieInformation.props'

export type optionsMenu = 'Overview' | 'Details' | 'Reviews'

export const MovieInformation: React.FC<MovieInformationProps> = ({ movie_infogmation }) => {

  const [activeItemMenu, setActiveItemMenu] = useState<optionsMenu>('Details');

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          <CurrentMovieNavigation
            active={activeItemMenu}
            changeActiveItem={setActiveItemMenu}
          />

          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">Wes Andreson</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  Bill Murray, <br />
                  Edward Norton, <br />
                  Jude Law, <br />
                  Willem Dafoe, <br />
                  Saoirse Ronan, <br />
                  Tony Revoloru, <br />
                  Tilda Swinton, <br />
                  Tom Wilkinson, <br />
                  Owen Wilkinson, <br />
                  Adrien Brody, <br />
                  Ralph Fiennes, <br />
                  Jeff Goldblum
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">1h 39m</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">Comedy</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">2014</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}