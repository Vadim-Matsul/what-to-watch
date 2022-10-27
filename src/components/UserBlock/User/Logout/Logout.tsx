import Link from 'next/link';
import { bePagesPaths } from '../../../../helpers/const/const';
import { useAppDispatch } from '../../../../helpers/Hooks/useAppDispatch';
import { API_ACTIONS } from '../../../../store/labouring/api-actions/api-actions';

export const Logout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    await dispatch(API_ACTIONS.logoutSession());
  };

  return (
    <Link href={bePagesPaths.main} >
      <a
        className="user-block__link"
        onClick={handleLogout}
      >Logout</a>
    </Link>
  );
};
