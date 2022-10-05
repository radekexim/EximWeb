
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectAllTransportOrders } from '../transportSlice';
import { useEffect, useState } from 'react';
import CollapsibleTable from './TransportListTable/CollapsibleTable';

export default function TransportList(props) {
    const transportOrders = useSelector(selectAllTransportOrders);
    const [transportData, setTransportData] = useState([]);
    const [quantity, setQuantity] = useState(0);

    function createTransportData(ordersTable) {
        const transportClients = ordersTable.map((order) => order.ne).filter((v, i, a) => a.indexOf(v) === i)
        const transportTable = [];
        let totalSale = 0;
        let totalQuantityOrders = 0;
        transportClients.map((client) => {
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
        props.settotal(totalSale);
        setTransportData(transportTable);
    }

    useEffect(() => {
        props.total ? (props.setmargindelivery((props.costdelivery / props.total) * 100)) : props.setmargindelivery(0)
        createTransportData(transportOrders);
    }, [props.total, props.costdelivery, transportOrders])

    return (
        <Paper sx={{ margin: 'auto', overflow: 'hidden', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}>
            <Typography component={'div'} sx={{ my: 2, mx: 2 }} color="text.secondary" align="center">
                <CollapsibleTable rows={transportData} />
            </Typography>
        </Paper>
    );
}