import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Index() {
    const topics = useSelector(state => state.topics.topics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTopics());
    }, []);
    return (
        <>
            <h1>Up2Date</h1>
            <h2>An independent, fully customizable news application.</h2>
            <p>Get started by <Link to="/register">registering</Link> or <Link to="/login">logging in</Link>.</p>
            {
                topics.map(topic => (
                    <div key={topic.id}>
                        <h3>{topic.name}</h3>
                        <p>{topic.description}</p>
                    </div>
                ))
            }
        </>
    );
}