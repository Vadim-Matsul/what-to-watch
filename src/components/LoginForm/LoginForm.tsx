import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { bePagesPaths, ErrorConfig } from '../../helpers/const/const';
import { getAuthStatus } from '../../store/reducers/index.selectors';
import { useAppDispatch } from '../../helpers/Hooks/useAppDispatch';
import { LoginData } from '../../types/user';
import { Loader } from '../Loader/Loader';


export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authStatus = useSelector(getAuthStatus);

  useEffect(() => {
    if (authStatus === 'AUTH') {
      router.push(bePagesPaths.main);
    }
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors: {
        email,
        password
      },
      isSubmitted,
      isSubmitting
    },
    reset
  } = useForm<LoginData>({
    mode: 'onChange'
  });
  const isError = authStatus === 'NOAUTH' && isSubmitted;
  const shouldShowloader = isSubmitting || !isError && isSubmitted;

  const handleFormSubmit = async (data: LoginData) => {
    await dispatch(API_ACTIONS.sendUserData(data));
    reset()
  };

  const registerEmail = {
    ...register('email', {
      required: {
        value: true,
        message: ErrorConfig.required
      },
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g,
        message: ErrorConfig.incorrectEmail
      }
    })
  };

  const registerPassword = {
    ...register('password', {
      required: {
        value: true,
        message: ErrorConfig.required
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?!.* )(?=.*\d).{1,}$/g,
        message: ErrorConfig.incorrectPassword
      }
    })
  };

  return (
    <div className="sign-in user-page__content">
      {shouldShowloader
        ? <Loader />
        : <>
          <form
            className="sign-in__form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" id="email" {...registerEmail} />
                <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
                {email && <div className='center' data-testid='error' >{email.message}</div>}
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" id="password" {...registerPassword} />
                <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
                {password && <div className='center' data-testid='error' >{password.message}</div>}
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                disabled={isError}
                className="sign-in__btn"
                type="submit"
              >Sign in</button>
            </div>
          </form>
          {isError && <div className='center' data-testid='form_error'>{ErrorConfig.globalError}</div>}
        </>}
    </div>
  );
};
