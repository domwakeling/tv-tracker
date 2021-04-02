import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const Footer = () => {

    const startYear = 2021;
    const currYear = new Date().getFullYear();
    const yearStr = currYear > startYear
        ? `${startYear}-${currYear}`
        : `${startYear}`;

    return (
        <>
            <br />
            <hr />
            <Container>
                <Box
                    pb={3}
                    pt={3}
                >
                    <Typography>
                        &copy;{yearStr}
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default Footer;
