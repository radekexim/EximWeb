import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import TransportOrderList from './TransportOrderList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BasicDatePicker from '../../../components/UI/Elements/BasicDatePicker';
import TransportList from './TransportList';
import AddIcon from '@mui/icons-material/Add';
import { changeTransportOrders, selectAllTransportOrders } from '../transportSlice';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function NewTransportPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    //Pobieranie danych na temat zleceń zaznaczonych
    const transportOrders = useSelector(selectAllTransportOrders);
    //Dane z inputów
    const [marginDelivery, setMarginDelivery] = useState(0);
    const [costDelivery, setCostDelivery] = useState(0);
    const [total, setTotal] = useState(0);
    const [transportName, setTransportName] = useState('');
    const [supplier, setSupplier] = useState('');
    const [truck, setTruck] = useState('');
    const [transportDate, setTransportDate] = useState(new Date());
    //Model z zaznaczeń w tabeli ze zleceniami
    const [selectionModel, setSelectionModel] = useState([]);

    const fetchData = async (transport) => {
        const response = await axios.post('/addTransport', transport);
        return response;
    }

    async function SaveList() {
        const data = {
            date: transportDate,
            name: transportName,
            supplier: supplier,
            truck: truck,
            costDelivery: costDelivery,
            marginDelivery: marginDelivery,
            saleTotal: total,
            transportOrders: transportOrders
        }
        try {
            const response = await fetchData(data)
            ResetList();
            navigate({
                pathname: "/Transport",
            });
        } catch (ex) {
            console.log(ex.response);
        }
    }

    const returnHandle = () => {
        navigate({
            pathname: "/Transport",
        });
    }

    function ResetList() {
        setSelectionModel([]);
        dispatch(changeTransportOrders([]));
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, my: 1, mx: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12}>
                        <Item>
                            <Typography variant="h4" align='center' color="text.secondary" sx={{ marginBottom: 1 }}>
                                Lista transportowa
                            </Typography>
                            <Grid container item xs={4} sm={8} md={12} direction="row" justifyContent="flex-start" spacing={2} >
                                <Grid item >
                                    <TextField
                                        id="name_transport"
                                        label="Nazwa"
                                        variant="outlined"
                                        value={transportName}
                                        onChange={(event) => setTransportName(event.target.value)} />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        id="name_supplier"
                                        label="Dostawca"
                                        variant="outlined"
                                        value={supplier}
                                        onChange={(event) => setSupplier(event.target.value)} />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        id="name_truck"
                                        label="Samochód"
                                        variant="outlined"
                                        value={truck}
                                        onChange={(event) => setTruck(event.target.value)} />
                                </Grid>
                                <Grid item >
                                    <BasicDatePicker date={transportDate} settransportdate={setTransportDate} />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        id="cost_delivery"
                                        label="Koszt dostawy"
                                        variant="outlined"
                                        type="number"
                                        value={costDelivery}
                                        onChange={(event) => setCostDelivery(Number(event.target.value))} />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        disabled
                                        id="total"
                                        label="Wartość zamówień"
                                        variant="outlined"
                                        value={total.toFixed(2)}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        disabled
                                        id="margin_delivery"
                                        label="Koszt Transportu [%]"
                                        variant="outlined"
                                        value={marginDelivery.toFixed(2)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        sx={marginDelivery < 7 ?
                                            { "& .MuiOutlinedInput-root.Mui-disabled": { "& > fieldset": { border: '1px solid green' } } }
                                            :
                                            { "& .MuiOutlinedInput-root.Mui-disabled": { "& > fieldset": { border: '1px solid red' } } }
                                        }
                                    />
                                </Grid>
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        color="success"
                                        onClick={SaveList}
                                        size='large'
                                    >
                                        Zapisz Listę
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        startIcon={<ReturnIcon />}
                                        color="error"
                                        onClick={returnHandle}
                                        size='large'
                                    >
                                        Cofnij
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={8} md={12}>
                                    <TransportList setmargindelivery={setMarginDelivery} settotal={setTotal} costdelivery={costDelivery} total={total} />
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid container item xs={4} sm={8} md={12} spacing={2} >
                        <TransportOrderList selectionmodel={selectionModel} setselectionmodel={setSelectionModel}></TransportOrderList>
                    </Grid>
                </Grid>
            </Box >
        </>
    );
}