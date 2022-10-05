import { TableCell, TableRow } from "@mui/material";
import React from "react";

export const TransportRowToPrint = (props) => {
    const rows = props.rows
    return (
        <>
            {rows.map((row) => {
                <TableRow >
                    <TableCell align="center">
                        {row.id}
                    </TableCell>
                    <TableCell align="center">
                        {row.client}
                    </TableCell>
                    <TableCell align="center">
                        {row.place}
                    </TableCell>
                    <TableCell align="center">
                        {row.orders}
                    </TableCell>
                    <TableCell align="center">
                        {row.palets}
                    </TableCell>
                </TableRow>
            })}
        </>
    );
}