import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';

export default function SearchBar({ displayedQuery, handleSearchQueryChange, handleSubmit }) {
    return (
        <FormControl component='form' onSubmit={handleSubmit} fullWidth >
            <InputLabel htmlFor="search">Search</InputLabel>
            <Input id="search" type="text" fullWidth value={displayedQuery} onChange={handleSearchQueryChange} />
            <Button variant="contained" color="primary" type='submit' startIcon={<Search />}>
                Search
            </Button>
        </FormControl>
    )
}