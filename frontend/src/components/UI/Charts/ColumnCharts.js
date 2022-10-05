import { Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js'
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export const ColumnCharts = (props) => {
    const theme = useTheme();

    const getBgColors = (array) => {
        let bg = array.map(value => value > 0 ? (props.colorone || '#3F51B5') : '#ff1744')
        return bg;
    }

    const data = {
        datasets: [
            {
                backgroundColor: getBgColors(props.seriesone),
                barPercentage: 1,
                barThickness: 25,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: props.seriesone,
                label: props.seriesonelabel,
                maxBarThickness: 50
            },
            {
                backgroundColor: props.colortwo || '#EEEEEE',
                barPercentage: 1,
                barThickness: 25,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: props.seriestwo,
                label: props.seriestwolabel,
                maxBarThickness: 50
            }
        ],
        labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: true },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
                offset: 2
            },
            legend: {
                display: props.legend
            }
        },
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
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

    return (
        <Card sx={{ boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }} {...props}>
            <CardHeader
                action={(
                    <Button
                        endIcon={<ArrowDropDownIcon fontSize="small" />}
                        size="small"
                    >
                        Last 7 days
                    </Button>
                )}
                title={props.title}
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Bar
                        data={data}
                        options={options}
                        plugins={[ChartDataLabels]}
                    />
                </Box>
            </CardContent>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                >
                    Overview
                </Button>
            </Box>
        </Card>
    );
};