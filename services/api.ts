import axios, { AxiosInstance } from 'axios'
import { CONFIG } from '../helpers/const/const'

export const createAxiosInstance = (): AxiosInstance => {

  const api = axios.create({
    baseURL: CONFIG.BASE,
    timeout: CONFIG.TIMEOUT
  })



  return api
}