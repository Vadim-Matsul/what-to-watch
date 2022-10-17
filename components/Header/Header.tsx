import { LogoLink } from '../Footer/LogoLink/LogoLink'
import { UserBlock } from '../UserBlock/UserBlock';
import { HeaderProps } from './Header.props';


export const Header: React.FC<HeaderProps> = ({ shouldShowUser = true }) => {

  return (
    <header className="page-header movie-card__head" >
      <LogoLink />
      {shouldShowUser && <UserBlock />}
    </header >
  )
}