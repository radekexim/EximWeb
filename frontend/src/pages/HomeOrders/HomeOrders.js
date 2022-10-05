import { useEffect } from 'react';
import LoadingIcon from '../../components/UI/Elements/LoadingIcon';
import Orders from './Orders';
import Snackbar from '../../components/UI/Elements/Snackbars';
import { selectAllOrders, fetchOrders } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function HomeOrders(props) {

    const dispatch = useDispatch()
    const orders = useSelector(selectAllOrders)

    const orderStatus = useSelector(state => state.orders.status)
    const error = useSelector(state => state.orders.error)


    useEffect(() => {
        if (orderStatus === 'idle') {
            dispatch(fetchOrders())
        }

    }, [orderStatus, dispatch])

    return orderStatus === 'loading' ? <LoadingIcon /> : (
        orderStatus === 'succeeded' ?
            <>
                <Orders orders={orders} reload={() => dispatch(fetchOrders())} />
                <Snackbar status={orderStatus} />
            </>
            : (<div>{error}</div>)

    );
}