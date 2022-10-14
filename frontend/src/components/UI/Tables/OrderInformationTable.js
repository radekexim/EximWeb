import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/system'
import { v4 as uuid } from 'uuid'

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #f3f4f6;
  }
`

export const OrderInformationTable = ({ data }) => {
  const progress = ((data.skany / data.sztuki) * 100).toFixed()
  const rows = [
    {
      name: 'Zlecenie',
      value: data.zlecenie,
    },
    {
      name: 'Pozycja',
      value: data.pozycja,
    },
    {
      name: 'Sztuki',
      value: data.sztuki,
    },
    {
      name: 'Kolor',
      value: data.kolor,
    },
    {
      name: 'Klient',
      value: data.klient,
    },
    {
      name: 'Referencja',
      value: data.reference,
    },
    {
      name: 'Opis',
      value: data.opis,
    },
    {
      name: 'Powierzchnia',
      value: data.powierzchnia ? data.powierzchnia.toFixed(2) : null,
    },
    {
      name: 'Waga',
      value: data.waga ? data.waga.toFixed(2) : null,
    },
    {
      name: 'Metry',
      value: data.metry ? data.metry.toFixed(2) : null,
    },
    {
      name: 'Uw',
      value: data.uw ? data.uw.toFixed(2) : null,
    },
    {
      name: 'Sw',
      value: data.sw ? data.sw.toFixed(2) : null,
    },
    {
      name: 'Postęp',
      value: `${data.skany} / ${data.sztuki} [ ${progress}% ]`,
    },
  ]
  return (
    <Table key={uuid()} size='small'>
      <TableBody>
        {rows.map((row) => (
          <TableRow hover key={uuid()}>
            <TableCell key={uuid()}>{row.name}</TableCell>
            <TableCell key={uuid()}>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
