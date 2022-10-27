import classNames from 'classnames';
import { Breadcrumbs, LogoLink, UserBlock } from '..';
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
    <header className={headerClass} data-testid='header' >
      <LogoLink />
      {shouldShowBreadcrumbs && <Breadcrumbs />}
      {shouldShowUser && <UserBlock />}
    </header >
  );
};
