import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import WindowIcon from '@mui/icons-material/Window';
import DoorIcon from '@mui/icons-material/MeetingRoom';

export const RoundCharts = (props) => {
    const theme = useTheme();
    const windows = props.count.find(obj => { return obj.name === 'Okna' }).value;
    const balcons = props.count.find(obj => { return obj.name === 'Balkony' }).value;
    const doorEntry = props.count.find(obj => { return obj.name === 'Drzwi wejściowe' }).value;
    const doorService = props.count.find(obj => { return obj.name === 'Drzwi serwisowe' }).value;
    const patia = props.count.find(obj => { return obj.name === 'Patia' }).value;
    const multi = props.count.find(obj => { return obj.name === 'Multi' }).value;
    const hst = props.count.find(obj => { return obj.name === 'HST' }).value;
    const fixs = props.count.find(obj => { return obj.name === 'FIX' }).value;
    const all = props.count.reduce((sum, object) => { return sum + object.value }, 0);
    const data = {
        datasets: [
            {
                data: [windows, doorEntry, doorService, balcons, fixs, multi, hst, patia],
                backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#ffea00', '#004d40', '#d500f9', '#3e2723', '#1de9b6'],
                borderWidth: 1,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Okna', 'Drzwi wejściowe', 'Drzwi serwisowe', 'Balkony', 'Fix', 'Multi', 'HST', 'Patia']
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const products = [
        {
            title: 'Okna',
            value: (windows ? ((windows / all) * 100).toFixed() : 0),
            icon: WindowIcon,
            color: '#3F51B5'
        },
        {
            title: 'Drzwi wejściowe',
            value: (doorEntry ? ((doorEntry / all) * 100).toFixed() : 0),
            icon: DoorIcon,
            color: '#E53935'
        },
        {
            title: 'Drzwi serwisowe',
            value: (doorService ? ((doorService / all) * 100).toFixed() : 0),
            icon: DoorIcon,
            color: '#FB8C00'
        }
    ];

    return (
        <Card sx={{ height: '100%', boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }} {...props}>
            <CardHeader title="Produkty" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {products.map(({
                        color,
                        icon: Icon,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Icon color="action" />
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}
                                %
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};