import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const TasksProgressCard = (props) => (
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
                        {props.label}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {`${(props.progress.units / 950 * 100).toFixed(2)} %`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'warning.main',
                            height: 46,
                            width: 46
                        }}
                    >
                        <InsertChartIcon />
                    </Avatar>
                </Grid>
            </Grid>
            <Box sx={{ pt: 3 }}>
                <LinearProgress
                    value={(props.progress.units / 950 * 100)}
                    variant="determinate"
                />
            </Box>
        </CardContent>
    </Card>
);