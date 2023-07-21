import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import routePointsReducer from '../slices/routesSlice'
import routePathReducer from '../slices/routePathSlice'
import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    routes: routePointsReducer,
    routePath: routePathReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware]),
})

sagaMiddleware.run(rootWatcher)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
