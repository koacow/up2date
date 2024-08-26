import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import StockPreviewCardLoading from './StockPreviewCardLoading';
import StockPreviewCardError from './StockPreviewCardError';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStockToUserWatchListThunk, removeStockFromUserWatchListThunk, fetchUserWatchList } from '../../state/slices/stockSlice';
import { currencyFormatter } from '../../utils/formatters';

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

    if (error) {
        return (
            <StockPreviewCardError ticker={ticker} />
        )
    } else if (!data) {
        return (
            <StockPreviewCardLoading />
        )
    } else {
        const { shortName, ask, regularMarketChange, regularMarketChangePercent } = data; 
        const changeIcon = (regularMarketChange > 0 ? <ArrowDropUp color='green' /> : <ArrowDropDown color='red' />);
        const changePercentIcon = (regularMarketChangePercent > 0 ? <ArrowDropUp color='green' /> : <ArrowDropDown color='red' />);
        return (
            <Card className='relative'>
                <CardActions className='absolute right-3'>
                    <Tooltip title={tooltipText}>
                        <span>
                            <IconButton onClick={handleAction} disabled={!session}>
                                <ActionIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </CardActions>
                <CardHeader 
                    title={ticker} 
                    titleTypographyProps={{
                        className: 'cursor-pointer font-semibold'
                    }}
                    subheaderTypographyProps={{
                        className: 'cursor-pointer'
                    }}
                    subheader={shortName} 
                    onClick={goToStockPage}
                />
                <CardContent>
                    <Typography variant='h6' component='h6'>{currencyFormatter(ask)}</Typography>
                    <Typography variant='h6' component='h6'>{changeIcon} {`${currencyFormatter(regularMarketChange)}`}</Typography>
                    <Typography variant='h6' component='h6'>{changePercentIcon} {`${regularMarketChangePercent}%`}</Typography>
                </CardContent>
                
            </Card>
        )
    }
}