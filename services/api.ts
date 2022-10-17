import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { CONFIG } from '../helpers/const/const'
import { deleteToken, getToken, setToken } from './storage'

export const createAxiosInstance = (): AxiosInstance => {

  const api = axios.create({
    baseURL: CONFIG.BASE,
    timeout: CONFIG.TIMEOUT,
  })

  // api.interceptors.response.use(
  //   (response: AxiosResponse<UserData>) => {
  //     if (response.config.method === 'post' && response.data.token) {
  //       setToken(response.data.token);
  //       delete response.data.token;
  //     }
  //     return response;
  //   }
  // );


  // api.interceptors.request.use((request) => {
  //   const token = getToken();
  //   if (token) { request.headers['x-token'] = token; }
  //   if (request.method === 'delete') { deleteToken(); }
  //   return request
  // });

  return api;
};
