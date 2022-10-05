import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

const defaultData = {
    date: '213123',
    transport: '',
    rows: [{
        id: 0,
        client: '',
        orders: '12121',
        palets: 0,
        place: '',
    }],
    constructions: [{ id: 0, constructions: [], notFinishConstructions: [] }]
};

export const TransportToPrint = React.forwardRef((props, ref) => {
    const transport = props.data ? props.data : defaultData
    const marginTop = '10px';
    const marginRight = '10px';
    const marginBottom = '10px';
    const marginLeft = '10px';

    const getPageMargins = () => {
        return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
    };

    return (
        <>
            <style type="text/css" media="print">
                {"@page { size: landscape; }"}
                {"@media print {.container{columns:2 auto;} "}
                {getPageMargins()}
            </style>
            <div ref={ref}>
                <div className="pagebreak">
                    <Typography variant="h4" align='center' color="text.secondary" sx={{ marginBottom: 1 }}>
                        {transport.date}
                    </Typography>
                    <Typography variant="h4" align='center' color="text.secondary" sx={{ marginBottom: 1 }}>
                        {transport.transport}
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginBottom: '10px' }}>
                        <Table aria-label="collapsible table">
                            <TableHead >
                                <TableRow>
                                    <TableCell >Miejsce</TableCell>
                                    <TableCell >Klient</TableCell>
                                    <TableCell >Adres Dostawy</TableCell>
                                    <TableCell >Zlecenia</TableCell>
                                    <TableCell >Palety</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transport.rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.client}</TableCell>
                                        <TableCell>{row.place}</TableCell>
                                        <TableCell>{row.orders}</TableCell>
                                        <TableCell>{row.palets}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="container">
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Zlecenie</TableCell>
                                    <TableCell align="left">Konstrukcje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transport.constructions.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor: row.notFinishConstructions.length === 0 ? "#808080" : null,
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left" >
                                            {row.projectString}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div >
                    <TableContainer component={Paper}>
                        <Typography
                            sx={{ flex: '1 1 100%', marginBottom: '5px' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Nie ukończone
                        </Typography>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" >Zlecenie</TableCell>
                                    <TableCell align="left" >Pozycja</TableCell>
                                    <TableCell align="left" >Konstrukcja</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transport.constructions.filter((row) => row.notFinishConstructions.length > 0).map((row) => (
                                    <>
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                backgroundColor: row.notFinishConstructions.length === 0 ? "#808080" : null,
                                            }}
                                        >
                                            <TableCell rowSpan={row.notFinishConstructions.length + 1}>
                                                {row.id}
                                            </TableCell>
                                        </TableRow>
                                        {row.notFinishConstructions.map((position) => (
                                            <TableRow>
                                                <TableCell align="left" >
                                                    {position.id}
                                                </TableCell>
                                                <TableCell align="left" >
                                                    {position.value + " " + position.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
});