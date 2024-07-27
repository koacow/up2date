import { React } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
    return (
        <>
            <h1>Up2Date</h1>
            <h2>An independent, fully customizable news application.</h2>
            <p>Get started by <Link to="/register">registering</Link> or <Link to="/login">logging in</Link>.</p>
        </>
    );
}