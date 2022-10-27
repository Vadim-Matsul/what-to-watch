import React from 'react';
import { useSelector } from 'react-redux';
import { Guest, Logout, User } from '..';
import { getAuthStatus, getStatusProgress } from '../../store/reducers/user-reducer/user-slice-selectors';


export const UserBlock: React.FC = () => {

  const authStatus = useSelector(getAuthStatus);
  const progressStatus = useSelector(getStatusProgress);

  const isAuth = authStatus === 'AUTH';
  const isStatusReady = progressStatus !== 'none';

  return (
    <>
      <div className="user-block">
        {isStatusReady &&
          <>
            {isAuth && <User />}
            {!isAuth && <Guest />}
          </>
        }
      </div>
      {isAuth && <Logout />}
    </>
  );
};