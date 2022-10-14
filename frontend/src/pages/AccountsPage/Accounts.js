import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Button, IconButton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import axios from '../../axios'
import DeleteButton from '../../components/UI/Elements/DeleteButton'
import DataTable from '../../components/UI/Tables/DataTable'
import { fetchAccounts } from './accountsSlice'

export default function Accounts({ accounts }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const columns = [
    { field: 'id', headerName: 'Id', width: 40, headerClassName: 'data-table-header' },
    { field: 'name', headerName: 'Nazwa', width: 400, headerClassName: 'data-table-header' },
    { field: 'email', headerName: 'Email', width: 400, headerClassName: 'data-table-header' },
    {
      field: 'isrole',
      headerName: 'Rola',
      width: 150,
      headerClassName: 'data-table-header',
      renderCell: (params) => (params.value === false ? 'Użytkownik' : 'Admin'),
    },
    {
      field: 'Action',
      headerName: 'Akcje',
      width: 260,
      headerClassName: 'data-table-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <IconButton>
            <EditIcon />
          </IconButton>
          <DeleteButton
            deletefunction={() => DeleteUser(params.id)}
            name={params.row.name}
          ></DeleteButton>
        </>
      ),
    },
  ]

  const fetchData = async (id) => {
    const response = await axios.post('/deleteUser', id)
    return response
  }

  async function DeleteUser(id) {
    try {
      await fetchData({
        id: id,
      })
      dispatch(fetchAccounts())
    } catch (ex) {
      // setError(ex.response.data)
      console.log(ex.response.data)
    }
  }

  function AddUser() {
    navigate({
      pathname: '/Rejestracja',
    })
  }

  return (
    <Paper
      sx={{
        maxWidth: 1300,
        margin: 'auto',
        overflow: 'hidden',
        my: 2,
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      }}
    >
      <Typography variant='h4' align='center' color='text.secondary'>
        Użytkownicy
      </Typography>
      <Typography variant='h4' align='left' color='text.secondary' sx={{ mx: 2 }}>
        <Button variant='contained' startIcon={<AddIcon />} color='success' onClick={AddUser}>
          Dodaj nowego
        </Button>
      </Typography>
      <Typography component={'div'} sx={{ my: 2, mx: 2 }} color='text.secondary' align='center'>
        <DataTable columns={columns} rows={accounts} />
      </Typography>
    </Paper>
  )
}
