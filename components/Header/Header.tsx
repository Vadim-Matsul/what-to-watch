import { useRouter } from 'next/router'
import { bePagesPaths } from '../../helpers/const/const';
import { LogoLink } from '../Footer/LogoLink/LogoLink'


export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const shouldShowUserBlock = pathname !== bePagesPaths.login;

  return (
    <header className="page-header movie-card__head" >
      <LogoLink />

      {shouldShowUserBlock &&
        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>}

    </header >
  )
}