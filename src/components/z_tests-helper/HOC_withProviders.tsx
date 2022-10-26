import { RouterContext } from 'next/dist/shared/lib/router-context';
import { MockStore } from '@jedmao/redux-mock-store';
import { createMockRouter } from './mockRouter';
import { makeFakeStore } from './testBundle';
import { NextRouter } from 'next/router';
import { Provider } from 'react-redux';
import { FC, ReactElement } from 'react';


/**
 *  HOC используется в компоненте, 
 *      использующем router и state;
 * 
 *  @param store 
 *   • по умолчанию state { }
 *   • для создания с иным state - makeFakeStore
 * 
 *  @param value 
 *    • замоканый router ( по умолчаннию NextRouter )
 *    • для создания с переопределёнными параметрами router - createMockRouter
 * 
 *  В тест-кейсе не нужно мокать путь 'next/router',
 *    необходимые данные для отрисовки замоканы;
 *  ( для ослеживания манипуляций - свой @param value )
 */
export const HOC_withProviders = <P extends Record<string, any>>(
  Component: FC<P>,
  store: MockStore = makeFakeStore({}),
  value: NextRouter = createMockRouter({})
) => {
  return function ProvidersWrapper(props: P): ReactElement {
    return (
      <RouterContext.Provider value={value} >
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      </RouterContext.Provider>
    );
  };
};
