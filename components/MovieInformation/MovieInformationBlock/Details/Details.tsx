import React from 'react';
import { adaptToDetails } from '../../../../helpers/adapter/adapter';
import { DetailsProps } from './Details.props';
import { DetailsItem } from './DetailsItem/DetailsItem';


export const Details: React.FC<DetailsProps> = ({ info }) => {

  const detailsInfo = adaptToDetails(info);

  return (
    <>
      {detailsInfo.map((infoBlock, i) =>
        <div className="movie-card__text-col" key={i} >
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
