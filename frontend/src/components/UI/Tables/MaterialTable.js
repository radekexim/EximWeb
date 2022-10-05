import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled } from '@mui/system';

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #F3F4F6;
  }
`;

export const MaterialTable = (props) => {
    const columns = Object.keys(props.data[0])
    return (
        <Card sx={{ height: '100%', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }} {...props} key={uuid()}>
            <CardHeader title={props.title} />
            <PerfectScrollbar key={uuid()} >
                <Box sx={{ minWidth: 800 }}>
                    <Table key={uuid()}>
                        <StyledTableHead key={uuid()}>
                            <TableRow key={uuid()}>
                                {columns.map((column) => (
                                    <TableCell key={uuid()}>
                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                    </TableCell>
                                )
                                )}
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {props.data.map((row) => (
                                <TableRow
                                    hover
                                    key={uuid()}
                                >
                                    <TableCell key={uuid()}>
                                        {row.stanowisko}
                                    </TableCell >
                                    <TableCell key={uuid()}>
                                        {format(new Date(row.skanowanie), 'dd-MM-yyyy hh:mm:ss')}
                                    </TableCell>
                                    <TableCell key={uuid()}>
                                        {row.zlecenie}
                                    </TableCell>
                                    <TableCell key={uuid()}>
                                        {row.pozycja}
                                    </TableCell>
                                    <TableCell key={uuid()}>
                                        {row.konstrukcja}
                                    </TableCell>
                                    <TableCell key={uuid()} >
                                        <img height="80" src={`data:image/png;base64,${row.obrazek}`} alt="" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box>
        </Card>
    )
};