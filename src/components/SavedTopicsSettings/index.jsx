import { updateUserSavedTopicsThunk, fetchUserSavedTopics, setTopics } from '../../state/slices/topicsSlice';
import { getAllTopics } from '../../api/articlesAPI';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomSnackbar from '../CustomSnackbar';

export default function SavedTopicsSettings () {
    const session = useSelector(state => state.session.session);
    const savedTopics = useSelector(state => state.topics.topics);
    const savedTopicsLoading = useSelector(state => state.topics.savedTopicsLoading);
    const savedTopicsError = useSelector(state => state.topics.savedTopicsError);
    const updateLoading = useSelector(state => state.topics.updateTopicsLoading);
    const updateError = useSelector(state => state.topics.updateTopicsError);
    const [displayedSavedTopics, setDisplayedSavedTopics] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    const [ snackbarOpen, setSnackbarOpen ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setDisplayedSavedTopics(savedTopics);
        getAllTopics().then(topics => {
            setAllTopics(topics);
        });
    }, []);


    const removeSavedTopic = (id) => {
        setDisplayedSavedTopics(prev => prev.filter(savedTopic => savedTopic.id !== id));
    }

    const addSavedTopic = (id) => {
        const addedTopic = allTopics.find(unsavedTopic => unsavedTopic.id === id);
        setDisplayedSavedTopics(prev => [...prev, addedTopic]);
    }

    const confirmChanges = async () => {
        if (!session){
            dispatch(setTopics(displayedSavedTopics));
            localStorage.setItem('savedTopics', JSON.stringify(displayedSavedTopics));
            setSnackbarOpen(true);
            return;
        }
        const topicIds = displayedSavedTopics.map(savedTopic => savedTopic.id);
        const res = await dispatch(updateUserSavedTopicsThunk(topicIds));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(fetchUserSavedTopics());
            setSnackbarOpen(true);
        }
    }

    const getItemStyle = (isSaved) => {
        return {
            border: '1px solid',
            borderColor: isSaved ? '' : 'primary.main',
            backgroundColor: isSaved ? 'secondary.main' : '',
        }
    }

    const confirmButtonDisabled = savedTopicsLoading || savedTopicsError || updateLoading || updateError;
    const confirmButtonLabel = () => {
        if (updateLoading) {
            return 'Updating your topics...';
        } else if (updateError) {
            return 'Oops! Something went wrong. Please try again.';
        } else {
            return 'Confirm Changes';
        }
    }
    return (
        <>
            <Typography variant='subtitle1' component='h2' className='font-extralight'>
                Add or remove topics from your saved topics list.
            </Typography>
            <List className='flex flex-wrap items-center justify-center'>
                {
                    allTopics.map(topic => {
                        const isSaved = displayedSavedTopics.some(savedTopic => savedTopic.id === topic.id);
                        return (
                            <ListItem 
                                sx={{...getItemStyle(isSaved)}}
                                className='rounded-full text-center cursor-pointer m-1 w-min text-nowrap transition-all duration-300'
                                key={topic.id}
                                onClick={() => isSaved ? removeSavedTopic(topic.id) : addSavedTopic(topic.id)}
                            >
                                <ListItemText 
                                    primary={topic.topic} 
                                    primaryTypographyProps={{ 
                                        className: 'font-semibold',
                                        variant: 'subtitle1',
                                        component: 'p'
                                    }} 
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
            <Button 
                variant='contained' 
                onClick={confirmChanges}
                disabled={confirmButtonDisabled}
                className='mt-4 w-full mx-auto rounded-md md:rounded-lg'
            >
                {confirmButtonLabel()}
            </Button>
            <CustomSnackbar 
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                message='Your saved topics have been updated.'
            />
        </>
    )
}