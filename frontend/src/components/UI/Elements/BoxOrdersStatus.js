import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';

export default function BoxOrdersStatus(props) {
    const getBackgroundColor = (color, mode) =>
        mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color, mode) =>
        mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);


    return (
        <Box
            sx={{
                height: 600,
                width: '100%',
                '& .super-app-theme--sent': {
                    bgcolor: (theme) =>
                        getBackgroundColor(theme.palette.sent.dark, 'light'),
                    '&:hover': {
                        bgcolor: (theme) =>
                            getHoverBackgroundColor(theme.palette.sent.main, 'light'),
                    },
                },
                '& .super-app-theme--1': {
                    bgcolor: (theme) =>
                        getBackgroundColor(theme.palette.primary.dark, 'light'),
                    '&:hover': {
                        bgcolor: (theme) =>
                            getHoverBackgroundColor(theme.palette.primary.main, 'light'),
                    },
                },
                '& .super-app-theme--2': {
                    bgcolor: (theme) =>
                        getBackgroundColor(theme.palette.secondary.dark, 'light'),
                    '&:hover': {
                        bgcolor: (theme) =>
                            getHoverBackgroundColor(theme.palette.secondary.main, 'light'),
                    },
                },
                '& .super-app-theme--3': {
                    bgcolor: (theme) =>
                        getBackgroundColor(theme.palette.info.dark, 'light'),
                    '&:hover': {
                        bgcolor: (theme) =>
                            getHoverBackgroundColor(theme.palette.info.main, 'light'),
                    },
                },
                '& .super-app-theme--4': {
                    bgcolor: (theme) =>
                        getBackgroundColor(theme.palette.success.dark, 'light'),
                    '&:hover': {
                        bgcolor: (theme) =>
                            getHoverBackgroundColor(theme.palette.success.main, 'light'),
                    },
                },
            }}>
            {props.children}
        </Box>
    );
}