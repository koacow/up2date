import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logUserIn } from '../state/slices/sessionSlice';

export default function Index() {
    const session = useSelector((state) => state.session);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logUserIn({ email: 'khoa.nd.cao@gmail.com', password: 'shibboleth' })); 
    }, [dispatch]);
    return (
        <>
            <h1>Up2Date</h1>
            <h2>An independent, fully customizable news application.</h2>
            <p>Get started by <Link to="/register">registering</Link> or <Link to="/login">logging in</Link>.</p>
            <p>{session.error}</p>
        </>
    );
}