import { v4 as uuid } from 'uuid';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { styled } from '@mui/system';

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #F3F4F6;
  }
`;

export const OrderInformationTable = (props) => {
    const progress = ((props.data.skany / props.data.sztuki) * 100).toFixed();
    const rows = [
        {
            name: 'Zlecenie', value: props.data.zlecenie
        },
        {
            name: 'Pozycja', value: props.data.pozycja
        },
        {
            name: 'Sztuki', value: props.data.sztuki
        },
        {
            name: 'Kolor', value: props.data.kolor
        },
        {
            name: 'Klient', value: props.data.klient
        },
        {
            name: 'Referencja', value: props.data.reference
        },
        {
            name: 'Opis', value: props.data.opis
        },
        {
            name: 'Powierzchnia', value: props.data.powierzchnia ? props.data.powierzchnia.toFixed(2) : null
        },
        {
            name: 'Waga', value: props.data.waga ? props.data.waga.toFixed(2) : null
        },
        {
            name: 'Metry', value: props.data.metry ? props.data.metry.toFixed(2) : null
        },
        {
            name: 'Uw', value: props.data.uw ? props.data.uw.toFixed(2) : null
        },
        {
            name: 'Sw', value: props.data.sw ? props.data.sw.toFixed(2) : null
        },
        {
            name: 'Postęp', value: `${props.data.skany} / ${props.data.sztuki} [ ${progress}% ]`
        },
    ]
    return (
        <Table key={uuid()} size="small">
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        hover
                        key={uuid()}
                    >
                        <TableCell key={uuid()}>
                            {row.name}
                        </TableCell >
                        <TableCell key={uuid()}>
                            {row.value}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};