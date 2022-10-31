import React from 'react';
import { adaptToDetails } from '../../../../helpers/adapter/adapter';
import { DetailsItem } from './DetailsItem/DetailsItem';
import { DetailsProps } from './Details.props';


export const Details: React.FC<DetailsProps> = ({ info }) => {

  const detailsInfo = adaptToDetails(info);

  return (
    <>
      {detailsInfo.map((infoBlock, i) =>
        <div
          className="movie-card__text-col"
          data-testid='wrapper'
          key={i}
        >
          {infoBlock.map(infoItem =>
            <DetailsItem
              name={infoItem.name}
              value={infoItem.value}
              key={infoItem.name}
            />
          )}
        </div>
      )}
    </>
  );
};
