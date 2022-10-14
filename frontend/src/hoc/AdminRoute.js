import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

export default function AdminRoute() {
  const [auth] = useAuth()

  return !auth ? (
    <Navigate to='/Zaloguj' replace />
  ) : !auth.role ? (
    <Navigate to='/' replace />
  ) : (
    <Outlet />
  )
}
