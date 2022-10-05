import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';

export const ForecastCard = (props) => (

    <Card
        sx={{ height: '100%', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}
        {...props}
    >
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        {`${props.label}`}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.forecast.forecastPercent}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'error.main',
                            height: 46,
                            width: 46
                        }}
                    >
                        <MoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>
            {props.forecast.forecastUnits && (<Box
                sx={{
                    pt: 1,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
                    Jednostki:
                </Typography>
                {(props.result - props.forecast.forecastUnits > 0) ? <ArrowDownwardIcon color="error" /> : <ArrowUpwardIcon color="success" />}
                <Typography
                    color={(props.result - props.forecast.forecastUnits > 0) ? "error" : "success.main"}
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                >
                    {props.forecast.forecastUnits}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
                    Premia: {(props.forecast.forecastUnits - props.result) > 0 ? (((props.forecast.forecastUnits - props.result) * 34.85) / 9).toFixed(2) : 0}
                </Typography>
            </Box>)}
        </CardContent>
    </Card>
);