import { experimentalStyled as styled } from '@mui/material/styles';
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FilterBox({ orders, setorders }) {
    const [orderId, setOrderId] = useState('');
    const [offerId, setOfferId] = useState('');
    const [client, setClient] = useState('');
    const [address, setAddress] = useState('');
    const [trader, setTrader] = useState('');
    const [deadline, setDeadline] = useState('');

    const filterHandle = () => {
        console.log(orderId);
        const filterOrders = orders.filter((order) => order.tradedocid.includes(orderId))
        setorders(filterOrders);
    }

    return (
        <Item>
            <Typography variant="h5" align='center' color="text.secondary" sx={{ marginBottom: 1 }}>
                Filtry
            </Typography>
            <Grid container item xs={4} sm={8} md={12} direction="row" justifyContent="center" spacing={2} sx={{ marginBottom: 1 }} >
                <Grid item >
                    <TextField
                        id="id_order"
                        label="Id zlecenia"
                        variant="outlined"
                        value={orderId}
                        onChange={(event) => setOrderId(event.target.value)} />
                </Grid>
                <Grid item >
                    <TextField
                        id="id_offer"
                        label="Id oferty"
                        variant="outlined"
                        value={offerId}
                        onChange={(event) => setOfferId(event.target.value)} />
                </Grid>
                <Grid item >
                    <TextField
                        id="client"
                        label="Klient"
                        variant="outlined"
                        value={client}
                        onChange={(event) => setClient(event.target.value)} />
                </Grid>
                <Grid item >
                    <TextField
                        id="address"
                        label="Adres dostawy"
                        variant="outlined"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)} />
                </Grid>
                <Grid item >
                    <TextField
                        id="trader"
                        label="Opiekun"
                        variant="outlined"
                        value={trader}
                        onChange={(event) => setTrader(event.target.value)} />
                </Grid>
                <Grid item >
                    <TextField
                        id="deadline"
                        label="Termin"
                        variant="outlined"
                        value={deadline}
                        onChange={(event) => setDeadline(event.target.value)} />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                startIcon={<FilterAltIcon />}
                color="primary"
                onClick={filterHandle}
                size='large'
            >
                Filtruj
            </Button>
        </Item>
    );
}