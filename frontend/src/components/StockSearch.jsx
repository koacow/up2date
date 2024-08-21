import { useState } from 'react';
import { searchStocksByQuery } from '../api/stocksAPI';
import { fetchUserWatchList, addStockToUserWatchListThunk } from '../state/slices/stockSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from './SearchBar';

export default function StockSearch(){
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [query, setQuery] = useState('');
    const [searched, setSearched] = useState(false);

    const navigate = useNavigate();
    const session = useSelector(state => state.session.session);
    const watchListLoading = useSelector(state => state.stocks.watchList.loading);
    const watchListError = useSelector(state => state.stocks.watchList.error);
    const dispatch = useDispatch();

    const handleAddToWatchlist = async (ticker) => {
        const res = await dispatch(addStockToUserWatchListThunk(ticker));      
        if (res.meta.requestStatus === 'fulfilled') {
            alert('Stock added to watchlist'); 
            dispatch(fetchUserWatchList());
        }
    }

    const handleQueryChange = (e) => {
        setSearched(false);
        setQuery(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearched(true);
        try {
            const results = await searchStocksByQuery(query);
            setSearchResults(results.quotes);
        } catch (error) {
            setSearchError(error);
        }
    }

    const renderSearchResults = () => {
        if (searchResults.length === 0 && searched) {
            return (
                <Card>
                    <CardHeader title='No Results' />
                </Card>
            )
        }
        
        if (searchError) {
            return (
                <Card>
                    <CardHeader title='Error' />
                    <CardActions>
                        <Typography variant='body1'>{searchError.message}</Typography>
                    </CardActions>
                </Card>
            )
        }

        return (
            <Stack spacing={2}>
                {searchResults.map(stock => {
                    if (!stock.symbol || !stock.shortname) {
                        return null;
                    }
                    return (
                        <Card 
                            key={stock.symbol} 
                        >
                            <CardHeader 
                                title={stock.symbol} 
                                subheader={stock.shortname} 
                                onClick={() => navigate(`/stocks/${stock.symbol}`)}
                                sx={{ cursor: 'pointer' }}
                            />
                            <CardActions>
                                <Tooltip 
                                    title={session ? 'Add To Watchlist' : 'Login To Add To Watchlist'}
                                    disableFocusListener={!session}
                                    disableHoverListener={!session}
                                    aria-disabled={!session}
                                    aria-label={session ? 'Add To Watchlist' : 'Login To Add To Watchlist'}
                                >
                                    <IconButton 
                                        disabled={!session}
                                        onClick={() => handleAddToWatchlist(stock.symbol)}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    )
                })}
            </Stack>
        )
    }
    
    return (
        <>
            <SearchBar displayedQuery={query} handleSearchQueryChange={handleQueryChange} handleSubmit={handleSubmit} />
            {renderSearchResults()}
        </>
    )
}