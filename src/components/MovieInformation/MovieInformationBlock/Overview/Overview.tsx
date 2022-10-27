import { adaptToOverview } from '../../../../helpers/adapter/adapter';
import { OverviewProps } from './Overview.props';



export const Overview: React.FC<OverviewProps> = ({ info }) => {
  const overviewInfo = adaptToOverview(info);

  return (
    <>
      {overviewInfo.map(item =>
        <p
          className={item.name && `movie-card__${item.name.toLowerCase()}`}
          key={`${item.value}`}
          data-testid='paragraph'
        >
          <strong>{item.name && item.name + ': '}{item.value}</strong>
        </p>
      )}
    </>
  );
};
