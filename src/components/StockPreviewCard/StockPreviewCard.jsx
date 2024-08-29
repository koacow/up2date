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
    const actionIconColor = action === 'add' ? 'primary' : 'secondary';
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
        const { shortName, ask, regularMarketPreviousClose, regularMarketChange, regularMarketChangePercent, currency } = data; 
        const changeIcon = (change) => change > 0 ? <ArrowDropUp /> : <ArrowDropDown />;
        const changeColor = (change) => change > 0 ? 'success.main' : 'destroy.main';

        return (
            <Card className='relative shadow-md aspect-auto'>
                <CardActions className='absolute right-0 top-0'>
                    <Tooltip title={tooltipText}>
                        <span>
                            <IconButton onClick={handleAction} disabled={!session} color={actionIconColor}>
                                <ActionIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </CardActions>
                <CardHeader 
                    title={ticker} 
                    titleTypographyProps={{
                        className: 'cursor-pointer font-semibold',
                        variant: 'h5',
                        component: 'h2'
                    }}
                    subheaderTypographyProps={{
                        className: 'cursor-pointer text-nowrap',
                        variant: 'subtitle2',
                        component: 'h3'
                    }}
                    subheader={shortName} 
                    onClick={goToStockPage}
                />
                <CardContent>
                    <Typography variant='h6' component='h3' color='primary'>
                        {ask ? currencyFormatter(ask, currency) : currencyFormatter(regularMarketPreviousClose, currency)}
                    </Typography>
                    <Typography variant='subtitle1' component='h4' color={changeColor(regularMarketChange)}>
                        {changeIcon(regularMarketChange)} {`${currencyFormatter(regularMarketChange, currency)}`}
                    </Typography>
                    <Typography variant='subtitle1' component='h4' color={changeColor(regularMarketChangePercent)}>
                        {changeIcon(regularMarketChangePercent)} {`${regularMarketChangePercent.toFixed(2)}%`}
                    </Typography>
                </CardContent>
                
            </Card>
        )
    }
}