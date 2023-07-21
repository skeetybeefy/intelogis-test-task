import { put, call, takeLatest, Effect } from 'redux-saga/effects'
import { API } from '../api/api'
import { routePathSlice } from '../slices/routePathSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { Route } from '../types'
import { LatLngTuple } from 'leaflet'

const { fetchRoutePath, fetchRoutePathSuccess, fetchRoutePathError } = routePathSlice.actions


function* routePathWorker(action: PayloadAction<Route>): Generator<Effect> {
  try {
    const points = yield call(API.getPathForRoute, action.payload)
    yield put(fetchRoutePathSuccess(points as Array<LatLngTuple>))
  } catch (e) {
    const err = e as Error
    yield put(fetchRoutePathError(err.message))
  }

}

export function* fetchRoutePathWatcher() {
  yield takeLatest(fetchRoutePath.type, routePathWorker)
}
