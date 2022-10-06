import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/UI/Elements/LoadingIcon';
import Orders from './Orders';
import Snackbar from '../../components/UI/Elements/Snackbars';
import { selectAllOrders, fetchOrders, selectAllComplaints } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux'
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function HomeOrders(props) {

    const dispatch = useDispatch()
    const orders = useSelector(selectAllOrders)
    const complaints = useSelector(selectAllComplaints)

    const orderStatus = useSelector(state => state.orders.status)
    const error = useSelector(state => state.orders.error)

    const [value, setValue] = useState('1');
    const tabChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        if (orderStatus === 'idle') {
            dispatch(fetchOrders())
        }

    }, [orderStatus, dispatch])

    return orderStatus === 'loading' ? <LoadingIcon /> : (
        orderStatus === 'succeeded' ?
            <>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={tabChange} aria-label="lab API tabs example">
                            <Tab label="Zlecenia" value="1" />
                            <Tab label="Reklamacje" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Orders orders={orders} reload={() => dispatch(fetchOrders())} />
                        <Snackbar status={orderStatus} />
                    </TabPanel>
                    <TabPanel value="2">
                        <Orders orders={complaints} reload={() => dispatch(fetchOrders())} />
                        <Snackbar status={orderStatus} />
                    </TabPanel>
                </TabContext>
            </>
            : (<div>{error}</div>)

    );
}