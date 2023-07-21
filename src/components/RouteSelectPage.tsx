import { FC } from "react"
import RoutesTable from "./RoutesTable"
import RouteMap from "./RouteMap"
import styles from '../styles/RouteSelectPage.module.css'

const RouteSelectPage: FC = () => {
  return (
    <section className={styles.routeSelectSection}>
      <h2 className={styles.heading}>Выбор маршрута</h2>
      <div className={styles.selectRouteContainer}>
        <RoutesTable/>
        <RouteMap />
      </div>
    </section>
  )
}

export default RouteSelectPage
