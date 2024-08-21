import { useState } from 'react';
import { searchStocksByQuery } from '../api/stocksAPI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchBar from './SearchBar';

export default function StockSearch(){
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const session = useSelector(state => state.session.session);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const results = await searchStocksByQuery(query);
            setSearchResults(results.quotes);
        } catch (error) {
            setSearchError(error);
        }
    }

    const renderSearchResults = () => {
        if (searchResults.length === 0) {
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
                            onClick={() => navigate(`/stocks/${stock.symbol}`)}
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                            <CardHeader title={stock.symbol} subheader={stock.shortname} />
                            <CardActions>
                                <IconButton 
                                    aria-label='add to watchlist' 
                                    title={session ? 'Add To Watchlist' : 'Login To Add To Watchlist'}
                                    disabled={!session}
                                >
                                    <AddIcon />
                                </IconButton>
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