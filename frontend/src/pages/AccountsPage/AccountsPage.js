import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIcon from '../../components/UI/Elements/LoadingIcon'
import Snackbar from '../../components/UI/Elements/Snackbars'
import Accounts from './Accounts'
import { fetchAccounts, selectAllAccounts } from './accountsSlice'

export default function AccountsPage() {
  const dispatch = useDispatch()
  const accounts = useSelector(selectAllAccounts)
  const accountsStatus = useSelector((state) => state.accounts.status)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    if (accountsStatus === 'idle') {
      dispatch(fetchAccounts())
    }
  }, [dispatch])

  return accountsStatus === 'loading' ? (
    <LoadingIcon />
  ) : accountsStatus === 'succeeded' ? (
    <>
      <Accounts accounts={accounts} />
      <Snackbar status={accountsStatus} />
    </>
  ) : (
    <div>{error}</div>
  )
}
