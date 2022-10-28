import { RootState } from '../../store/store.types';

import { appInitialState } from '../../store/reducers/app-reducer/app-state';
import { userInitialState } from '../../store/reducers/user-reducer/user-state';
import { basicInitialState } from '../../store/reducers/data-reducer/basic-slice/basic-state';
import { currentSliceState } from '../../store/reducers/data-reducer/current-slice/current-state';

import { dataReducerInterface } from '../../store/reducers/data-reducer/data-reducer.combine';
import { appInitialState_Interface } from '../../store/reducers/app-reducer/app-types';
import { basicInitialState_Interface } from '../../store/reducers/data-reducer/basic-slice/basic-types';
import { currentSliceState_Interface } from '../../store/reducers/data-reducer/current-slice/current-types';
import { userInitialState_Interface } from '../../store/reducers/user-reducer/user-types';


/** TYPE */
type PartsBasic = Partial<basicInitialState_Interface>;
type PartsCurrent = Partial<currentSliceState_Interface>;
type PartsApp = Partial<appInitialState_Interface>;
type PartsUser = Partial<userInitialState_Interface>;

/** store/data/basic */
export const makeDataBasicSlice = (
  substitute: PartsBasic = {},
): Record<'basic', basicInitialState_Interface> => ({
  basic: {
    ...basicInitialState,
    ...substitute,
  }
});

/** store/data/current */
export const makeDataCurrentSlice = (
  substitute: PartsCurrent = {}
): Record<'current', currentSliceState_Interface> => ({
  current: {
    ...currentSliceState,
    ...substitute,
  }
});

/** store/data */
export const makeData = (
  substituteBasic: PartsBasic = {},
  substituteCurrent: PartsCurrent = {},
): Record<'data', dataReducerInterface> => ({
  data: {
    ...makeDataBasicSlice(substituteBasic),
    ...makeDataCurrentSlice(substituteCurrent)
  }
});

/** store/app */
export const makeAppSlice = (
  substitute: PartsApp = {},
): Record<'app', appInitialState_Interface> => ({
  app: {
    ...appInitialState,
    ...substitute,
  }
});

/** store/user */
export const makeUserSlice = (
  substitute: PartsUser = {},
): Record<'user', userInitialState_Interface> => ({
  user: {
    ...userInitialState,
    ...substitute,
  }
});

/** store */
export const makeRootState = (
  substituteBasic: PartsBasic = {},
  substituteCurrent: PartsCurrent = {},
  substituteApp: PartsApp = {},
  substituteUser: PartsUser = {},
): RootState => ({
  ...makeData(substituteBasic, substituteCurrent),
  ...makeAppSlice(substituteApp),
  ...makeUserSlice(substituteUser),
});
