import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { objectToArrayWithId } from '../../helpers/objectOrders';
import axios from '../../axios';
import { useState } from 'react';
import Orders from '../HomeOrders/components/Orders';
import LoadingIcon from '../../components/UI/Elements/LoadingIcon';

export default function Search(props) {
    const [searchparams] = useSearchParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const search = async () => {
        try {

            const res = await axios.get('/orders');
            const newOrders = objectToArrayWithId(res.data)
                .filter(order => order.tradedocid.includes(searchparams.get("id")));

            setOrders(newOrders);
        } catch (ex) {
            console.log(ex.response);
        }
        setLoading(false);
    }

    useEffect(() => {
        search();
    }, [searchparams]);

    return loading ? <LoadingIcon /> : (
        <>
            <Orders orders={orders} reload={() => search()} />
        </>
    );
}