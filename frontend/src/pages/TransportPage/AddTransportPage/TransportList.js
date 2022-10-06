
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransportOrders, selectAllTransportOrders } from '../transportSlice';
import { useEffect, useState } from 'react';
import CollapsibleTable from './TransportListTable/CollapsibleTable';

export default function TransportList(props) {
    const { setmargindelivery, settotal, costdelivery, total } = props
    const transportOrders = useSelector(selectAllTransportOrders);
    const dispatch = useDispatch();
    const [transportData, setTransportData] = useState([]);
    const [quantity, setQuantity] = useState(0);

    function createTransportData(ordersTable) {
        const transportClients = ordersTable.map((order) => order.ne).filter((v, i, a) => a.indexOf(v) === i)
        const transportTable = [];
        let totalSale = 0;
        let totalQuantityOrders = 0;
        transportClients.forEach((client) => {
            const orders = ordersTable.filter(order => order.ne === client);
            const saleValue = orders.reduce((sum, element) => Number(sum) + Number(element.value_sale), 0);
            totalSale += saleValue;
            const quantityOrders = orders.length
            totalQuantityOrders += quantityOrders;
            transportTable.push({
                name: client,
                saleValue: saleValue,
                quantityOrders: quantityOrders,
                orders: orders
            });
        })
        setQuantity(totalQuantityOrders);
        settotal(totalSale);
        setTransportData(transportTable);
    }

    const deleteOrderFromList = (id) => {
        let newTransportOrders = transportOrders.filter((order) => order.id !== id);
        dispatch(changeTransportOrders(newTransportOrders));
    }

    useEffect(() => {
        total ? (setmargindelivery((costdelivery / total) * 100)) : setmargindelivery(0)
        createTransportData(transportOrders);
    }, [total, costdelivery, transportOrders, setmargindelivery])

    return (
        <Paper sx={{ margin: 'auto', overflow: 'hidden', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}>
            <Typography component={'div'} sx={{ my: 2, mx: 2 }} color="text.secondary" align="center">
                <CollapsibleTable rows={transportData} deletefunction={deleteOrderFromList} />
            </Typography>
        </Paper>
    );
}