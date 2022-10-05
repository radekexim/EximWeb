import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const cards = [
    {
        id: 1,
        title: 'Zamówienia',
        description: 'Tabela produkcyjna z zamówieniami'
    },
    {
        id: 2,
        title: 'Wykresy',
        description: 'Statystyki produkcyjne'
    },
];

export default function Home() {

    return (
        <>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                <Box>
                    <img src={"/images/logo-jm-exim.svg"} alt="" />
                </Box>
            </Typography>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Aplikacja produkcyjno-handlowa
            </Typography>
            <Grid container spacing={10} marginBottom={5} justifyContent="center">
                <Grid item>
                    <Button variant="contained" color="primary">
                        Main call to action
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary">
                        Secondary action
                    </Button>
                </Grid>
            </Grid>
            {/* End hero unit */}
            <Grid container spacing={5} justifyContent="center" direction="column">
                {cards.map(card => (
                    <Grid container item key={card.id} justifyContent="center">
                        <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                            <CardMedia
                                image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                title="Image title"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.title}
                                </Typography>
                                <Typography>
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Otwórz
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}