import { LatLngTuple } from "leaflet"

export interface Route {
  key: string,
  name: string,
  points: Array<LatLngTuple>
}

export type RouteSlice = Route & {isSelected?: boolean}

export type TableRowRoute = {
  key: string,
  name: string,
  point1: string,
  point2: string,
  point3: string,
  isSelected?: boolean
}

export type LngLatTuple = LatLngTuple
