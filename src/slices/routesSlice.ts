import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { API } from "../api/api";
import { Route, RouteSlice } from "../types";

type RoutesSlice = Array<RouteSlice>

const initialState: RoutesSlice = API.getRoutes()

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    fetchRoutes: (state) => {
      state = API.getRoutes()
      return state
    },
    setSelectedRoute: ((state, action: PayloadAction<Route>) => {
      state.forEach(route => delete route.isSelected)
      const selectedRouteIndex = state.findIndex(route => route.key === action.payload.key)
      state[selectedRouteIndex].isSelected = true
      return state
    }),
    selectRoute: ((_, _action: PayloadAction<Route>) => {})
  }
})

export default routesSlice.reducer
