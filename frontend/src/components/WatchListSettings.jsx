import { useSelector } from 'react-redux';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Remove from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import SearchBar from './SearchBar';

export default function WatchListSettings(){
    const watchList = useSelector(state => state.stocks.saved.stocks);

    const removeStock = (tickerToRemove) => {
        const newWatchList = watchList.filter(ticker => ticker !== tickerToRemove);
    }

    const [tickerQuery, setTickerQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleQueryChange = (e) => {
        setTickerQuery(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchResults([]);
        setTickerQuery('');
    };

    return (
        <>
            <Card>
                <CardHeader title='Your Saved Stocks' />
                <CardContent>
                    <List>
                        {
                            watchList.map((ticker, index) => {
                                return (
                                    <ListItem key={index}>
                                        {ticker}
                                        <IconButton onClick={removeStock(ticker)}>
                                            <Remove />
                                        </IconButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </CardContent>
                <CardActionArea>
                    <CardHeader title='Find stock to track' />
                    <SearchBar />
                </CardActionArea>
            </Card>
        </>
    )
}