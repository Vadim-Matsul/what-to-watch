import Link from 'next/link'
import { bePagesPaths } from '../../../helpers/const/const';


export const Guest: React.FC = () => {
  return (
    <Link href={bePagesPaths.login} >
      <a className="user-block__link">Sign in</a>
    </Link>
  );
};
