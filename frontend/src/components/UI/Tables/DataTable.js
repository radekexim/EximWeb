import * as React from 'react'

import Box from '@mui/material/Box'
import { DataGrid, GridToolbar, plPL } from '@mui/x-data-grid'

export default function DataTable({ rows, columns, onRowClick, options }) {
  return (
    <Box
      sx={{
        height: 800,
        '& .MuiDataGrid-row': { cursor: 'pointer' },
        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F3F4F6' },
      }}
    >
      <DataGrid
        columnBuffer={12}
        rows={rows}
        columns={columns}
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        components={{ Toolbar: GridToolbar }}
        onRowClick={onRowClick}
        getRowClassName={() => 'MuiDataGrid-row'}
        {...options}
      />
    </Box>
  )
}
