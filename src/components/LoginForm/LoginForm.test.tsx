import { NextRouter } from 'next/router';
import { ErrorConfig } from '../../helpers/const/const';
import { testBundle } from '../z_tests-helper/testBundle';
import { LoginForm } from './LoginForm';

const {
  render,
  screen,
  faker,
  makeFakeStore,
  HOC_withProviders,
  createMockRouter,
  UserEvent,
  storeExamples: { makeUserSlice } } = testBundle;

describe('Component: LoginForm', () => {

  let mockRouter: NextRouter
  beforeEach(() => {
    mockRouter = createMockRouter({});
    jest.clearAllMocks();
  });

  it('Корректный рендер компонента', () => {
    const userState = makeUserSlice({ authStatus: 'UNKNOWN' });
    const LoginFormWrapped = HOC_withProviders(LoginForm, makeFakeStore(userState));
    render(LoginFormWrapped({}));

    const button = screen.getByRole('button', { name: /Sign in/i });
    const inp_email = screen.getByPlaceholderText(/Email address/i);
    const inp_password = screen.getByPlaceholderText(/Password/i);
    const [email, password] = screen.queryAllByTestId(/error/i);

    expect(button).not.toBeNull();
    expect(inp_email).not.toBeNull();
    expect(inp_password).not.toBeNull();
    expect(email).toBeUndefined();
    expect(password).toBeUndefined();
    expect(button).not.toBeDisabled();
  });

  it('Редирект со странице при NOAUTH', () => {
    const userState = makeUserSlice({ authStatus: 'AUTH' });
    const LoginFormWrapped = HOC_withProviders(LoginForm, makeFakeStore(userState), mockRouter);
    render(LoginFormWrapped({}));

    expect(mockRouter.push).toBeCalledTimes(1);
  });

  it('Корректная работа формы', async () => {
    const mockStore = makeFakeStore(makeUserSlice({ authStatus: 'NOAUTH' }));
    const LoginFormWrapped = HOC_withProviders(LoginForm, mockStore);
    render(LoginFormWrapped({}));
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch').mockImplementation(a => a);

    const email_input = screen.getByPlaceholderText(/Email address/i);
    const password_input = screen.getByPlaceholderText(/Password/i);

    await UserEvent.type(email_input, 'testEmailToError');
    await UserEvent.type(password_input, 'testPasswordToError');

    let error_bundle: (HTMLElement | undefined)[]     // [email, password]
    error_bundle = await screen.findAllByTestId(/error/i);

    expect(error_bundle[0]).toHaveTextContent(ErrorConfig.incorrectEmail);
    expect(error_bundle[1]).toHaveTextContent(ErrorConfig.incorrectPassword);

    await UserEvent.type(email_input, faker.internet.email());
    await UserEvent.type(password_input,'testFulfilled7380');
    error_bundle = screen.queryAllByTestId(/error/i);

    expect(error_bundle).toEqual([undefined, undefined]);

    const button = screen.getByRole('button', { name: /Sign in/i });

    expect(dispatchSpy).not.toBeCalled();
    await UserEvent.click(button);
    expect(dispatchSpy).toBeCalled();
  });

});