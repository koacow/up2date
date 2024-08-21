import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStockToUserWatchListThunk, removeStockFromUserWatchListThunk, fetchUserWatchList } from '../state/slices/stockSlice';

export default function StockPreviewCard({ ticker, data, error, action }) {
    const navigate = useNavigate();
    const goToStockPage = () => {
        navigate(`/stocks/${ticker}`);
    }

    const dispatch = useDispatch();
    const session = useSelector(state => state.session.session);
    const handleAction = async () => {
        if (!session) return;
        if (action === 'add') {
            await dispatch(addStockToUserWatchListThunk(ticker));
        } else if (action === 'remove') {
            await dispatch(removeStockFromUserWatchListThunk(ticker));
        }
        dispatch(fetchUserWatchList());
    }

    const ActionIcon = action === 'add' ? AddIcon : RemoveIcon;
    const tooltipText = action === 'add' ? 'Add to Watchlist' : 'Remove from Watchlist';

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
                <TableRow onClick={goToStockPage} hover>
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
                    <TableCell>
                        <Tooltip title={tooltipText}>
                            <IconButton onClick={handleAction} disabled={!session}>
                                <ActionIcon />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            )
        }
    }
    return render();
}