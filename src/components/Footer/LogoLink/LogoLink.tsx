import Link from 'next/link'
import classNames from 'classnames'
import { LogoLinkProps } from './LogoLink.props';
import { bePagesPaths } from '../../../helpers/const/const';

export const LogoLink: React.FC<LogoLinkProps> = ({ isLight }) => {

  const LogoLinkClass = classNames('logo__link', {
    'logo__link--light': isLight
  });

  return (
    <div className="logo">
      <Link href={ bePagesPaths.main } >
        <a className={LogoLinkClass}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </Link>
    </div>
  );
};
