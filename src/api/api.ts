import axios from "axios"
import { LngLatTuple, Route } from "../types"
import { LatLngTuple } from "leaflet"


export class API {
  public static getRoutes() {
    return [
      {
        key: '1',
        name: 'Маршрут 1',
        points: [
          [59.84660399, 30.29496392],
          [59.82934196, 30.42423701],
          [59.83567701, 30.38064206],
        ],
      },
      {
        key: '2',
        name: 'Маршрут 2',
        points: [
          [59.82934196, 30.42423701],
          [59.82761295, 30.41705607],
          [59.84660399, 30.29496392],
        ],
      },
      {
        key: '3',
        name: 'Маршрут 3',
        points: [
          [59.83567701, 30.38064206],
          [59.84660399, 30.29496392],
          [59.82761295, 30.41705607],
        ],
      },
    ] as Array<Route>
  }

  public static async getPathForRoute(route: Route): Promise<Array<LatLngTuple>> {
    const lngLatRoutePoints: Array<LngLatTuple> = route.points.map(route => route.slice().reverse() as LngLatTuple)
    const lngLatRoutePointsString = lngLatRoutePoints.map(route => route.join(",")).join(";")
    try {
      const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${lngLatRoutePointsString}?overview=full&steps=true&geometries=geojson`)
      const points = response.data.routes[0].geometry.coordinates.map((point: LngLatTuple) => point.slice().reverse())
      return points
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e.message
      } else {
        throw "Error has happened while getting route points"
      }
    }
  }
}
