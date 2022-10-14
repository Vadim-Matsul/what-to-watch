import { LogoLink } from '../Footer/LogoLink/LogoLink'


export const Header: React.FC = () => {

  return (
    <header className="page-header movie-card__head" >
      <LogoLink />

      <div className="user-block">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </div>
    </header >
  )
}