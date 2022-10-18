import classNames from 'classnames';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { LogoLink } from '../Footer/LogoLink/LogoLink'
import { UserBlock } from '../UserBlock/UserBlock';
import { HeaderProps } from './Header.props';


export const Header: React.FC<HeaderProps> = (props) => {

  const {
    shouldShowUser = true,
    isFavorite = false,
    shouldShowBreadcrumbs = false
  } = props;

  const theHeaderClass = isFavorite ? 'user-page' : 'movie-card';
  const headerClass = classNames(`page-header ${theHeaderClass}__head`);

  return (
    <header className={headerClass} >
      <LogoLink />
      {shouldShowBreadcrumbs && <Breadcrumbs />}
      {shouldShowUser && <UserBlock />}
    </header >
  );
};
