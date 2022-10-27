import { DetailsItemProps } from './DetailsItem.props'

export const DetailsItem: React.FC<DetailsItemProps> = ({ name, value }) => (
  <p className="movie-card__details-item">
    <strong className="movie-card__details-name" data-testid='details-name'>{name}</strong>
    <span className="movie-card__details-value">{value}</span>
  </p>
);
