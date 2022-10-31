import { EqualsId, OrderData, OrderDataObj } from '../types/movies';


const KEY = 'Token';
const ORDER_FAVORITES = 'Order_Favorites';

export const setToken = (token: string) => localStorage.setItem(KEY, token);
export const deleteToken = () => localStorage.removeItem(KEY);
export const getToken = () => localStorage.getItem(KEY);

export const firstSetOrderFav = () => localStorage.setItem(ORDER_FAVORITES, '[]');
export const deleteOrderFav = () => localStorage.removeItem(ORDER_FAVORITES);
export const setOrderFav = (body: string) => localStorage.setItem(ORDER_FAVORITES, body);

export const getOrderFavorites = (): OrderData => {
  const OrderFav: OrderData = JSON.parse(localStorage.getItem(ORDER_FAVORITES)!) || [];

  const checkEqualsId: EqualsId = {};

  // При совпадении order ( происходит при удалении и добавлении фильма )
  // Находим фильмы с одинаковыми order
  //   --> фильму, находящемуся дальше в массиве, присваиваем order на единицу больше
  OrderFav.length && OrderFav.sort((a, b) => a.order! > b.order! ? 1 : -1).forEach(({ order, id }, index) => {
    order in checkEqualsId
      ? checkEqualsId[order.toString()].push({ id, index })
      : checkEqualsId[order.toString()] = [{ id, index }];
  });

  for (let key in checkEqualsId) {
    if (checkEqualsId[key].length > 1) {
      const [firstMovie, secondMovie] = checkEqualsId[key];
      const biggerInArray = checkEqualsId[key].find(data => data.index === Math.max(firstMovie.index, secondMovie.index));
      OrderFav.forEach(DATA => { if (DATA.id === biggerInArray?.id) DATA.order = parseInt(key) + 1; });
    }
  };

  return OrderFav;
};

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
