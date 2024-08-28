import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

export default function SearchBar({ displayedQuery, handleSearchQueryChange, handleSubmit }) {
    const [ searchIconColor, setSearchIconColor ] = useState('default');
    return (
        <FormControl 
            component='form' 
            onSubmit={handleSubmit} 
            fullWidth 
            className='flex'
        >
            <InputLabel htmlFor="search">Search</InputLabel>
            <Input 
                id="search" 
                type="text" 
                value={displayedQuery} 
                onChange={handleSearchQueryChange} 
                fullWidth
                autoFocus
                inputProps={{
                    onFocus: () => setSearchIconColor('primary'),
                    onBlur: () => setSearchIconColor('default')
                }}
                startAdornment={
                    <InputAdornment position='start'>
                        <IconButton type='submit'>
                            <Search color={searchIconColor} />
                        </IconButton>
                    </InputAdornment>
                }
                aria-describedby='search for articles'
            />
        </FormControl>
    )
}