import { all } from "redux-saga/effects";
import { selectedRouteWatcher } from "./routesSaga";
import { fetchRoutePathWatcher } from "./routePathSaga";

export function* rootWatcher() {
  yield all([selectedRouteWatcher(), fetchRoutePathWatcher()])
}
