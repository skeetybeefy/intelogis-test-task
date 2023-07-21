import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatLngTuple } from "leaflet";
import { Route } from "../types";

interface InitialState {
  isLoading: boolean,
  error: string,
  routePoints: Array<LatLngTuple>
}

const initialState: InitialState = {
  isLoading: false,
  error: '',
  routePoints: []
}

export const routePathSlice = createSlice({
  name: 'routePath',
  initialState,
  reducers: {
    fetchRoutePath: ((state, _action: PayloadAction<Route>) => {
      state.isLoading = true
      return state
    }),
    fetchRoutePathSuccess: ((state, action: PayloadAction<Array<LatLngTuple>>) => {
      state.isLoading = false
      state.error = ''
      state.routePoints = action.payload
      return state
    }),
    fetchRoutePathError: ((state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.routePoints = []
      return state
    })
  }
})

export default routePathSlice.reducer
