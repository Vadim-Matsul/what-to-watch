import { NextPage } from 'next';

import { API_ACTIONS } from '../store/labouring/api-actions/api-actions';
import MainPage from '../page-components/Main/MainPage'
import { wrapper_Server_Client } from '../store/store';


const Main: NextPage = () => <MainPage />;

Main.getInitialProps = wrapper_Server_Client.getInitialPageProps(({ dispatch }) => async ctx => {
  await dispatch(API_ACTIONS.fetchMovies());
});

export default Main;
