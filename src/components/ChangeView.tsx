import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngTuple, Polyline } from "leaflet";

interface ChangeViewProps {
  routePoints: Array<LatLngTuple>,
  polyline?: Polyline
}

const ChangeView: FC<ChangeViewProps> = ({ routePoints, polyline }) => {
  const map = useMap();

  useEffect(() => {
    if (polyline && routePoints.length > 0) {
      map.fitBounds(polyline.getBounds())
    }
  }, [routePoints])

  return null;
}

export default ChangeView
