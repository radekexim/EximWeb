
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import plLocale from 'date-fns/locale/pl'
export default function BasicDatePicker(props) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}>
            <DatePicker
                label="Data transportu"
                value={props.date}
                onChange={(newValue) => {
                    props.settransportdate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}