import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSavedTopics, initiateInitialTopics } from "../state/slices/topicsSlice";
import { fetchUserSavedStocks } from "../state/slices/stockSlice";
import { fetchSettingsAsync } from "../state/slices/settingsSlice";

export default function MainTemplate() {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.session);
    useEffect(() => {
      if (session) {
        dispatch(fetchUserSavedTopics());
        dispatch(fetchUserSavedStocks());
        dispatch(fetchSettingsAsync());
      } else {
        dispatch(initiateInitialTopics());
      }
    }, [session]);
    
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}