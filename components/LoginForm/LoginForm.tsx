import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../helpers/Hooks/useAppDispatch';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { AsyncThunkResult, RootState } from '../../store/store.types';
import { LoginData } from '../../types/user';

export const LoginForm: React.FC = () => {

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit
  } = useForm();

  const handleFormSubmit = (data: LoginData) => {
    dispatch(API_ACTIONS.sendUserData(data))

  }

  const registerEmail = {
    ...register('email', {

    })
  };

  const registerPassword = {
    ...register('password', {

    })
  };

  return (
    <div className="sign-in user-page__content">

      <form
        className="sign-in__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input className="sign-in__input" type="email" placeholder="Email address" id="email" {...registerEmail} />
            <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
          </div>
          <div className="sign-in__field">
            <input className="sign-in__input" type="password" placeholder="Password" id="password" {...registerPassword} />
            <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">Sign in</button>
        </div>
      </form>

    </div>
  );
};
