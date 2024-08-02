import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticlesByQuery } from '../state/slices/searchSlice';

export default function Index() {
    const searchedArticles = useSelector(state => state.search.articles);
    const searchedArticlesLoading = useSelector(state => state.search.searchLoading);
    const searchedArticlesError = useSelector(state => state.search.searchError);

    const handleSearchState = () => {
        if (searchedArticlesLoading) {
            return <p>Loading...</p>;
        } else if (searchedArticlesError) {
            return <p>Error: {searchedArticlesError}</p>;
        } else if (searchedArticles.length === 0) {
            return <p>No articles found.</p>;
        } else {
            return (
                <ul>
                    {searchedArticles.map(article => (
                        <li key={article.id}>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                        </li>
                    ))}
                </ul>
            );
        }
    };            
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticlesByQuery('AI'));
    }, [dispatch]);
    return (
        <>
            <h1>Up2Date</h1>
            <h2>An independent, fully customizable news application.</h2>
            <p>Get started by <Link to="/register">registering</Link> or <Link to="/login">logging in</Link>.</p>
            {handleSearchState()}
        </>
    );
}