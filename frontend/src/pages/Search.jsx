import SearchBar from '../components/SearchBar';
import ArticleCard from "../components/ArticleCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery, fetchArticlesByQuery, setSearchPageNum } from '../state/slices/articlesSlice';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

export default function Search() {
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.articles.search.query);
    const searchPage = useSelector(state => state.articles.search.pageNum);
    const loading = useSelector(state => state.articles.search.loading);
    const error = useSelector(state => state.articles.search.error);
    const articles = useSelector(state => state.articles.search.articles);

    const [displayedQuery, setDisplayedQuery] = useState(searchQuery);
    const [displayedSearchPage, setDisplayedSearchPage] = useState(searchPage);

    const handleSearchQueryChange = (e) => {
        const newQuery = e.target.value;
        setDisplayedQuery(newQuery);
        dispatch(setSearchQuery(newQuery));
    };

    const handlePageChange = (e, value) => {
        setDisplayedSearchPage(value);
        dispatch(setSearchPageNum(value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchArticlesByQuery());
    }

    const renderSearchResults = () => {
        if (loading) {
            return <Typography>Loading...</Typography>
        } else if (error) {
            return <Typography color='error'>Error loading articles. Please try again.</Typography>
        } else {
            return (
                <Stack spacing={2}>
                    {
                        articles.map((article, index) => {
                            return <ArticleCard key={index} article={article} />
                        })
                    }
                </Stack>
            )
        }
    }

    useEffect(() => {
        dispatch(fetchArticlesByQuery());
    }, [displayedSearchPage]);

    return (
        <Container>
            <SearchBar query={searchQuery} displayedQuery={displayedQuery} handleSearchQueryChange={handleSearchQueryChange} handleSubmit={handleSubmit} />
            {renderSearchResults()}
            {
                articles.length > 0 && <Pagination count={10} page={displayedSearchPage} onChange={handlePageChange} color='primary' />
            }
        </Container>
    );
}