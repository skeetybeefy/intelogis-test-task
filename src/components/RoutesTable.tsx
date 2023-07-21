import { FC } from "react";
import { Table } from 'antd'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { TableRowRoute } from "../types";
import { routesSlice } from "../slices/routesSlice";
import { routePathSlice } from "../slices/routePathSlice";
import styles from "../styles/RoutesTable.module.css"

interface RoutesTableProps {
  className?: string
}

const RoutesTable: FC<RoutesTableProps> = ({ className }) => {
  const routes = useSelector((state: RootState) => state.routes)
  const dispatch = useAppDispatch()
  const { selectRoute } = routesSlice.actions
  const { fetchRoutePath } = routePathSlice.actions
  const columns = [
    {
      title: 'Маршрут',
      dataIndex: 'name',
      key: 'route'
    },
    {
      title: `Точка 1`,
      dataIndex: `point1`,
      key: `point1`
    },
    {
      title: `Точка 2`,
      dataIndex: `point2`,
      key: `point2`
    },
    {
      title: `Точка 3`,
      dataIndex: `point3`,
      key: `point3`
    },
  ]

  const data: Array<TableRowRoute> = []

  routes.forEach((route, index) => data.push(
    {
      key: route.key,
      name: `Маршрут ${index + 1}`,
      point1: route.points[0].join(", "),
      point2: route.points[1].join(", "),
      point3: route.points[2].join(", "),
      isSelected: route.isSelected
    },
  ))

  return (
    <>
      <Table
        className={`${styles.table} ${className}`}
        columns={columns}
        dataSource={data}
        rowClassName={(record => record.isSelected ? `${styles.row} ${styles.activeRow}` : styles.row)}
        onRow={(record) => {
          return {
            onClick: (() => {
              const selectedRoute = routes.find(route => route.key === record.key)!
              dispatch(selectRoute(selectedRoute))
              dispatch(fetchRoutePath(selectedRoute))
            })
          }
        }}
      />
    </>
  )
}

export default RoutesTable
