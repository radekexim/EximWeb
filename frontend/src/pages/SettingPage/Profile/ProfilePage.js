import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Alert } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../axios'

export default function ProfilePage() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState(auth.email);
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const res = await fetchData({
                email: data.get('email'),
                password: data.get('password'),
                userId: auth.userId,
            })
            setAuth({
                userId: res.data.idUser,
                token: auth.token,
                role: auth.role,
                email: res.data.email
            });
            setSuccess('Dane zaktualizowane')
        } catch (ex) {
            setError(ex.response.data)
            console.log(ex.response.data);
        }
    }

    const fetchData = async (credentials) => {
        const response = await axios.post('/updateUser', credentials);
        return response;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edycja profila
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label='Adres email'
                        name="email"
                        autoComplete="email"
                        autoFocus
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error ? (
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    ) : null}
                    {success ? (
                        <Alert variant="filled" severity="success">
                            {success}
                        </Alert>
                    ) : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Zapisz
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}