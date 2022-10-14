import { useDispatch, useSelector } from 'react-redux'

import { login, logout, selectAuth } from '../app/authSlice'

export default function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  const setAuth = (user) => {
    if (user) {
      dispatch(login(user))
      window.localStorage.setItem('token-data', JSON.stringify(user))
    } else {
      dispatch(logout())
      window.localStorage.removeItem('token-data')
    }
  }

  return [auth, setAuth]
}
