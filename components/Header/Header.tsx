import classNames from 'classnames';
import { LogoLink } from '../Footer/LogoLink/LogoLink'
import { UserBlock } from '../UserBlock/UserBlock';
import { HeaderProps } from './Header.props';


export const Header: React.FC<HeaderProps> = ({ shouldShowUser = true, isFavorite = false }) => {

  const theHeaderClass = isFavorite ? 'user-page' : 'movie-card';
  const headerClass = classNames(`page-header ${theHeaderClass}__head`);

  return (
    <header className={headerClass} >
      <LogoLink />
      {shouldShowUser && <UserBlock />}
    </header >
  );
};
