import * as React from 'react';
import { DataGrid, GridToolbar, plPL } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
export default function DataTable(props) {


    return (
        <Box sx={{
            height: 800,
            '& .MuiDataGrid-row': { cursor: 'pointer' },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: '#F3F4F6', }
        }} >
            <DataGrid
                columnBuffer={12}
                rows={props.rows}
                columns={props.columns}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                components={{ Toolbar: GridToolbar }}
                onRowClick={props.onRowClick}
                getRowClassName={() => `MuiDataGrid-row`}
                {...props.options}
            />
        </ Box>
    );
}