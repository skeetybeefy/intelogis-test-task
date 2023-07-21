import { FC, useRef } from "react";
import { TileLayer, MapContainer, Polyline, Marker } from "react-leaflet";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import ChangeView from "./ChangeView";
import { LatLngTuple } from "leaflet";
import styles from "../styles/RouteMap.module.css"


const RouteMap: FC = () => {
  const route = useSelector((state: RootState) => state.routes.find(route => route.isSelected))
  const routePath = useSelector((state: RootState) => state.routePath)
  const polylineRef = useRef(null)

  const { routePoints, error } = routePath

  const DEFAULT_CENTER: LatLngTuple = [59.917983, 30.323981]
  const DEFAULT_ZOOM = 12

  return (
    <>
      <MapContainer 
        center={route?.points[0] ?? DEFAULT_CENTER} 
        zoom={DEFAULT_ZOOM}
      >
        {
          error &&
          <div className={styles.overlay}>Ошибка при получении маршрута</div>
        }
        {
          route?.points.map(point => (
            <Marker position={point} key={point.toString()}/>
          ))
        }
        <Polyline positions={routePoints} color="red" ref={polylineRef}/>
        <ChangeView routePoints={routePoints} polyline={polylineRef.current ?? undefined} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

export default RouteMap
