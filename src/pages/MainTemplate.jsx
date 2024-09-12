import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSavedTopics, initiateInitialTopics } from "../state/slices/topicsSlice";
import { fetchUserWatchList } from "../state/slices/stockSlice";
import { fetchSettingsAsync } from "../state/slices/settingsSlice";
import { fetchSessionThunk, fetchUserDataThunk } from "../state/slices/sessionSlice";

export default function MainTemplate() {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.session);

    // TO DO: Uncomment the following code when you have finished implementing authentication functionality
    // useEffect(() => {
    //   dispatch(fetchSessionThunk());
    //   dispatch(fetchUserDataThunk());
    // }, []);

    useEffect(() => {
      if (session) {
        dispatch(fetchUserSavedTopics());
        dispatch(fetchUserWatchList());
        dispatch(fetchSettingsAsync());
      } else {
        dispatch(initiateInitialTopics());
      }
    }, [session]);
    
    return (
        <>
            <NavBar />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}