import { AnyAction } from '@reduxjs/toolkit'
import { GetStaticProps } from 'next'
import MainPage from '../page-components/Main/MainPage'
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions'
import { wrapper_Server_Client } from '../store/store'

const Main = () => {
  return (
    <>
      <MainPage />
    </>
  )
}

export const getStaticProps: GetStaticProps = wrapper_Server_Client.getStaticProps(store => async ctx => {

  await store.dispatch(API_ACTIONS.fetchMovies() as unknown as AnyAction);

  return {
    props: {}
  }

});

export default Main