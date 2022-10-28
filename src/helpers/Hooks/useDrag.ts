import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderMovies, Events, guardEventListener } from '../utils/utils';
import { ACTIONS } from '../../store/labouring/actions/actions';
import { getActiveFavId } from '../../store/reducers/index.selectors';

export const useDrag = (ref: React.RefObject<HTMLElement>, should: boolean, movieId: number) => {
  if (!should) { return; }
  const dispatch = useDispatch();
  const startId = useSelector(getActiveFavId);

  const handleChangeStartId = (startId: number) => {
    dispatch(ACTIONS.setActiveFavId(startId))
  }

  useEffect(() => {

    const instance = ref.current!;

    /**
     *  preventDefault отменяет действие браузера по умолчанию, 
     *   запрещающее 'drop' на карточку
     */
    const listenerDragOver = (evt: Events) => {
      evt.preventDefault();
      const target = evt.currentTarget as HTMLElement;
      if (startId == movieId) return;
      target.className = 'drag-on-hover'
    }

    const listenerDragStart = (evt: Events) => {
      const target = evt.currentTarget as HTMLElement;
      handleChangeStartId(movieId)
      target.className = 'drag-start'
    }

    const listenerDragEnd = (evt: Events) => {
      const target = evt.currentTarget as HTMLElement;
      // Для того, чтобы состояние карточки не хэшировалось и блок if в listenerDragOver & listenerDragLeave
      // отрабатывал корректно, меняем на изначальное состояние
      handleChangeStartId(0)
      target.className = 'small-movie-card catalog__movies-card'
    }

    const listenerDragLeave = (evt: Events) => {
      if (startId == movieId) return;
      const target = evt.currentTarget as HTMLElement;
      target.style.transition = 'all 0.3s ease-in-out;'
      target.className = 'small-movie-card catalog__movies-card'
    }

    const listenerDragDrop = (evt: Events) => {
      const target = evt.currentTarget as HTMLElement;
      target.className = 'small-movie-card catalog__movies-card'
      if (movieId === startId) return;
      changeOrderMovies(startId, movieId)
    }

    const removeDragStart = guardEventListener('dragstart', instance, listenerDragStart);
    const removeDragOver = guardEventListener('dragover', instance, listenerDragOver);
    const removeDragEnd = guardEventListener('dragend', instance, listenerDragEnd);
    const removeDragLeave = guardEventListener('dragleave', instance, listenerDragLeave);
    const removeDragDrop = guardEventListener('drop', instance, listenerDragDrop);

    return () => {
      removeDragStart!();
      removeDragOver!();
      removeDragEnd!();
      removeDragLeave!();
      removeDragDrop!();
    }
  }, [startId]);
};
