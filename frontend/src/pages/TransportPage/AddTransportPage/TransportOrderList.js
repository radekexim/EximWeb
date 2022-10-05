
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DataTable from '../../../components/UI/Tables/DataTable';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import LinearProgressWithLabel from '../../../components/UI/Elements/LinearProgressWithLabel';
import { SeverityPill } from '../../../components/UI/Elements/Severity-Pill';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransportOrders } from '../transportSlice';
import FilterBox from './Components/FilterBox';
import { useEffect, useState } from 'react';
import { fetchOrders, selectAllOrders } from '../../HomeOrders/orderSlice';
import AddIcon from '@mui/icons-material/Add';
const columns = [
    {
        field: "actions",
        headerName: "Dodaj",
        width: 70,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
            return (
                <Box
                    sx={{
                        // backgroundColor: "whitesmoke",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <IconButton onClick={() => console.log(params.id)}>
                        <AddIcon />
                    </IconButton>
                </Box>
            );
        }

    },
    { field: 'tradedocid', headerName: 'Id zlecenia', width: 90 },
    { field: 'offerid', headerName: 'Id oferty', width: 90 },
    { field: 'users', headerName: 'Opiekun', width: 150 },
    {
        field: 'ne', headerName: 'Klient', width: 250,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <span>{params.value}</span>
            </Tooltip>
        ),
    },
    {
        field: 'reference', headerName: 'Referencja', width: 250,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <span>{params.value}</span>
            </Tooltip>
        ),
    },
    {
        field: 'addressdelivery', headerName: 'Adres dostawy', width: 250,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <span>{params.value}</span>
            </Tooltip>
        ),
    },
    {
        field: 'progress',
        headerName: 'Progres',
        renderCell: (params) => (
            <LinearProgressWithLabel value={Number(params.value)} />
        ),
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => (
            <SeverityPill
                color={(params.value === 'Otwarte' && 'error')
                    || (params.value === 'Zablokowane' && 'info')
                    || (params.value === 'W produkcji' && 'warning')
                    || (params.value === 'Zakończone' && 'success')
                }
            >
                {params.value === 'Zablokowane' ? 'Oczekujące' : params.value}
            </SeverityPill>
        ),
        width: 130,
    },
    { field: 'weeknumber_realization', headerName: 'Termin', width: 60, },
    { field: 'value_sale', headerName: 'Wartość', width: 100, },
];

export default function TransportOrderList(props) {
    const dispatch = useDispatch();
    const allOrders = useSelector(selectAllOrders)
    const [allFilteringOrders, setFilteringOrders] = useState();
    const [orders, setOrders] = useState(allOrders);
    const orderStatus = useSelector(state => state.orders.status)
    const error = useSelector(state => state.orders.error)

    const options = {
        checkboxSelection: true,
        disableSelectionOnClick: true,
        onSelectionModelChange: (ids) => {
            props.setselectionmodel(ids)
            const selectedIDs = new Set(ids);
            const selectedRowData = orders.filter((row) =>
                selectedIDs.has(row.id.toString())
            );
            dispatch(changeTransportOrders(selectedRowData));
        },
        selectionModel: props.selectionmodel,
    }

    const filterOrders = (ordersTable) => {
        let filteringOrders = ordersTable.filter((order) =>
            order.date_delivery === "---"
        ).sort((a, b) => (a.weeknumber_realization < b.weeknumber_realization ? -1 : 1))
            .sort((a, b) => (a.cntorderstatus > b.cntorderstatus ? -1 : 1));
        setOrders(filteringOrders);
        setFilteringOrders(filteringOrders);
    }

    useEffect(() => {
        if (orderStatus === 'idle') {
            dispatch(fetchOrders())
        }
        filterOrders(allOrders)
    }, [orderStatus, dispatch])

    return (
        <>
            <Grid item xs={3} sm={6} md={9} >
                <Paper sx={{ margin: 'auto', overflow: 'hidden', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}>
                    <Typography variant="h4" align='center' color="text.secondary">Zlecenia</Typography>
                    <Typography component={'div'} sx={{ my: 2, mx: 2 }} color="text.secondary" align="center">
                        <DataTable options={options} columns={columns} rows={orders} />
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={1} sm={2} md={3} >
                <FilterBox setorders={setOrders} orders={allFilteringOrders} />
            </Grid>
        </>
    );
}