import { useNavigate, useSearchParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { binaryToBase64 } from "../../../helpers/binaryToBase64";
import axios from "../../../axios";
import { OrderTable } from "../../../components/UI/Tables/OrderTable";
import { OrderInformationTable } from "../../../components/UI/Tables/OrderInformationTable";
import ReturnIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/system";

export default function OrderPage(props) {
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();
    const [order, setOrder] = useState([]);
    const [positionId, setPositionId] = useState('001');
    const [position, setPosition] = useState({});
    const [image, setImage] = useState('');

    const showPosition = (value) => {
        setPositionId(value);
        const newPosition = order.find(obj => { return obj.pozycja === value });
        setPosition(newPosition);
        setImage(newPosition.obrazek);
    }
    const returnHandle = () => {
        navigate({
            pathname: "/Zamowienia",
        });
    }

    const fetchOrder = async (id) => {
        try {
            const response = await axios.get('/order', { params: { id: id } });
            const order = binaryToBase64(response.data);
            setOrder(order)
            const newPosition = order.find(obj => { return obj.pozycja === positionId });
            setPosition(newPosition);
            setImage(newPosition.obrazek);
        } catch (ex) {
            console.log(ex.message);
        }
    }

    useEffect(() => {
        const id = searchparams.get('id')
        fetchOrder(id);
    }, [searchparams])

    useEffect(() => {

    }, [positionId])

    return (
        <Grid container spacing={1} align="center" >
            <Grid item align="left" xs={3}>
                <IconButton onClick={returnHandle}>
                    <ReturnIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex' }}>
                <Card sx={{
                    display: 'flex', margin: '10px', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
                }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 300, height: 300, marginTop: '80px', marginLeft: '10px' }}
                        image={`data:image/png;base64,${image}`}
                        alt=""
                    />
                    <Box sx={{
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <OrderInformationTable data={position} />
                        </CardContent>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sx={{ margin: '5px' }}>
                <OrderTable data={order} setposition={showPosition} />
            </Grid>
        </Grid>
    );
}