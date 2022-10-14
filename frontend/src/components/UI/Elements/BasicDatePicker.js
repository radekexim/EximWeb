import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import plLocale from 'date-fns/locale/pl'

export default function BasicDatePicker({ date, settransportdate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}>
      <DatePicker
        label='Data transportu'
        value={date}
        onChange={(newValue) => {
          settransportdate(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
