import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import StockGroupCard from './StockGroupCard';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverviewData } from '../state/slices/stockSlice';
import { useEffect } from 'react';

export default function StocksOverview() {
    const dispatch = useDispatch();
    const regionsData = useSelector((state) => state.stocks.overview.regions);
    const loading = useSelector((state) => state.stocks.overview.loading);
    const error = useSelector((state) => state.stocks.overview.error);

    useEffect(() => {
        dispatch(fetchOverviewData());
    }, []);
}