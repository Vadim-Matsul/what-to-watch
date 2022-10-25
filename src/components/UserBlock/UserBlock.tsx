import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { bePagesPaths } from '../../helpers/const/const';
import { useAppDispatch } from '../../helpers/Hooks/useAppDispatch';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { getAuthStatus, getStatusProgress } from '../../store/reducers/user-reducer/user-slice-selectors';
import { Loader } from '../Loader/Loader';
import { Guest } from './Guest/Guest';
import { User } from './User/User';


export const UserBlock: React.FC = () => {

  const authStatus = useSelector(getAuthStatus);
  const progressStatus = useSelector(getStatusProgress);

  const isAuth = authStatus === 'AUTH';
  const isStatusChecking = progressStatus === 'none';

  return (
    <>
      <div className="user-block">
        {isStatusChecking
          ? <Loader />
          : <>
            {isAuth && <User />}
            {!isAuth && <Guest />}
          </>
        }
      </div>
      {isAuth && <Logout />}
    </>
  );
};

const Logout: React.FC = () => {
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
