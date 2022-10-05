import { useEffect } from 'react';
import LoadingIcon from '../../components/UI/Elements/LoadingIcon';
import Snackbar from '../../components/UI/Elements/Snackbars';
import { selectAllAccounts, fetchAccounts } from './accountsSlice';
import { useDispatch, useSelector } from 'react-redux'
import Accounts from './Accounts';

export default function AccountsPage(props) {

    const dispatch = useDispatch()
    const accounts = useSelector(selectAllAccounts)
    const accountsStatus = useSelector(state => state.accounts.status)
    const error = useSelector(state => state.error)

    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, [dispatch])

    return accountsStatus === 'loading' ? <LoadingIcon /> : (
        accountsStatus === 'succeeded' ?
            <>
                <Accounts accounts={accounts} />
                <Snackbar status={accountsStatus} />
            </>
            : (<div>{error}</div>)

    );
}