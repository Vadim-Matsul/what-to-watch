import React from 'react';

export interface MovieCardProps {
  img_title: string,
  onTitleClick: ( evt: React.MouseEvent<HTMLHeadingElement> ) => void
}