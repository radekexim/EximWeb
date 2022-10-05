import { Card, CardContent, Grid, Typography } from '@mui/material';

export const TotalCard = (props) => (
    <Card sx={{ height: '100%', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }} {...props}>
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
                        {props.label}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.value}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);