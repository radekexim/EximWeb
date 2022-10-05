import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function RefreshPage(props) {

    return (
        <Grid container spacing={1} alignItems="right" justifyContent="right">
            <Grid item xs={6} >
                <Tooltip title="Reload">
                    <IconButton onClick={props.reload}>
                        <RefreshIcon fontSize="large" sx={{ display: 'block', color: 'primary' }} />
                    </IconButton>
                </Tooltip>
            </Grid>
            {props.progress === 'loading' && (
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', py: 2, px: 0, }}>
                        <Grid justifyContent="center">
                            <LinearProgress />
                        </Grid>
                    </Box>
                </Grid>)}
        </Grid>
    );
}



