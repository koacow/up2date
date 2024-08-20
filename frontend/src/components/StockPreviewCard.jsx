import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export default function StockPreviewCard({ ticker, data, error }) {
    const render = () => {
        if (error) {
            return (
                <TableRow>
                    <TableCell>
                        <Typography variant='h3' component='h3'>{ticker}</Typography>
                        <Typography variant='h6' component='h6'>Error: {error}</Typography>
                    </TableCell>
                </TableRow>
            )
        } else if (!data) {
            return (
                <TableRow>
                    <TableCell>
                        <Typography variant='h3' component='h3'>{ticker}</Typography>
                        <Typography variant='h6' component='h6'>Loading...</Typography>
                    </TableCell>
                </TableRow>
            )
        } else {
            const { shortName, ask, regularMarketChange, regularMarketChangePercent } = data; 
            return (
                <TableRow hover>
                    <TableCell>
                        <Typography variant='h3' component='h3'>{ticker}</Typography>
                        <Typography variant='h6' component='h6'>{shortName}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6' component='h6'>{ask}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6' component='h6'>{regularMarketChange}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6' component='h6'>{regularMarketChangePercent}</Typography>
                    </TableCell>
                </TableRow>
            )
        }
    }
    return render();
}