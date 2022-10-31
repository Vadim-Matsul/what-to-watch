import { OrderData, OrderDataObj } from '../types/movies';


const KEY = 'Token';
const ORDER_FAVORITES = 'Order_Favorites';

export const setToken = (token: string) => localStorage.setItem(KEY, token);
export const deleteToken = () => localStorage.removeItem(KEY);
export const getToken = () => localStorage.getItem(KEY);

export const firstSetOrderFav = () => localStorage.setItem(ORDER_FAVORITES, '[]');
export const deleteOrderFav = () => localStorage.removeItem(ORDER_FAVORITES);
export const setOrderFav = (body: string) => localStorage.setItem(ORDER_FAVORITES, body);

export const getOrderFavorites = (): OrderData => {
  const OrderFav: OrderData = JSON.parse(localStorage.getItem(ORDER_FAVORITES)!);
  return OrderFav;
}

export const setOrderFavorites = (data: OrderDataObj): void => {
  const actual = getOrderFavorites();
  actual.push(data);
  setOrderFav(JSON.stringify(actual))
};

export const deleteOrderFavorite = (id: number): void => {
  const actual = getOrderFavorites();
  const fiiltered = actual.filter(obj => obj.id !== id);
  setOrderFav(JSON.stringify(fiiltered));
};
