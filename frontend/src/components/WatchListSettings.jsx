import { fetchUserSavedStocks, updateUserSavedStocksThunk } from '../state/slices/stockSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function WatchListSettings(){
    const watchList = useSelector(state => state.stocks.saved.stocks);
    const dispatch = useDispatch();

    useEffect
}