
const KEY = 'Token';

export const setToken = (token: string) => localStorage.setItem(KEY, token);
export const deleteToken = () => localStorage.removeItem(KEY);
export const getToken = () => localStorage.getItem(KEY);