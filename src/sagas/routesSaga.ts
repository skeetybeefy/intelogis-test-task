import { PayloadAction } from "@reduxjs/toolkit";
import { Route } from "../types";
import { put, takeLatest } from "redux-saga/effects";
import { routesSlice } from "../slices/routesSlice";

const { selectRoute, setSelectedRoute } = routesSlice.actions

export function* routesWorker(action: PayloadAction<Route>) {
  yield put(setSelectedRoute(action.payload))
}

export function* selectedRouteWatcher() {
  yield takeLatest(selectRoute.type, routesWorker)
}
