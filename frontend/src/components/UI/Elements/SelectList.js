import { useDispatch, useSelector } from 'react-redux'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { monthUpdated } from '../../../pages/ProductionPage/productionSlice'

const months = [
  { id: 0, name: 'styczeń', value: 0 },
  { id: 1, name: 'luty', value: 1 },
  { id: 2, name: 'marzec', value: 2 },
  { id: 3, name: 'kwiecień', value: 3 },
  { id: 4, name: 'maj', value: 4 },
  { id: 5, name: 'czerwiec', value: 5 },
  { id: 6, name: 'lipiec', value: 6 },
  { id: 7, name: 'sierpień', value: 7 },
  { id: 8, name: 'wrzesień', value: 8 },
  { id: 9, name: 'październik', value: 9 },
  { id: 10, name: 'listopad', value: 10 },
  { id: 11, name: 'grudzień', value: 11 },
]

export default function SelectList() {
  const dispatch = useDispatch()

  const month = useSelector((state) => state.production.month)
  const handleChange = (event) => {
    dispatch(monthUpdated(event.target.value))
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='demo-select-small'>Miesiąc</InputLabel>
      <Select
        labelId='demo-select-small'
        id='demo-select-small'
        value={month}
        defaultValue='all'
        label='Miesiąc'
        onChange={handleChange}
      >
        <MenuItem value='all'>
          <em>Cały rok</em>
        </MenuItem>
        {months.map((month) => (
          <MenuItem key={month.id} value={month.value}>
            {month.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
