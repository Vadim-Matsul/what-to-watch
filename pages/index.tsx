import { AnyAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import MainPage from '../page-components/Main/MainPage'
import { ACTIONS } from '../store/labouring/actions/actions'
import { API_ACTIONS } from '../store/labouring/api-actions/api-actions'
import { setMovieCover } from '../store/reducers/data-reducer/basic-slice/basic-slice'
import { wrapper_Server_Client } from '../store/store'
import { Movies } from '../types/movies'

const Main: NextPage = () => {

  return (
    <>
      <MainPage />
    </>
  )
}


export default Main;
