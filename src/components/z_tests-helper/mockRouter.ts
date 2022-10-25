import { NextRouter } from 'next/router';



/**
 * Возвращает замоканый Router для RouterContext.Provider
 *  Передав нужные нам аргументы мы можем переопределить данные, необходимые в компоненте
 * 
 *  Вместо того, чтобы мокать: 
 *      jest.mock('next/router', () => ({
 *        ........
 *        useRouter: () => ({ router: ..., .... })
 *      }))
 *  
 *  Практичнее замокать весь router;
 */
export const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    route: '',
    pathname: '',
    query: {},
    asPath: '',
    basePath: '',
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isPreview: false,
    isReady: true,
    isLocaleDomain: false,
    ...router
  };
};
