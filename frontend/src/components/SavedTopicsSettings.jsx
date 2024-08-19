import { updateUserSavedTopicsThunk, fetchUserSavedTopics } from '../state/slices/topicsSlice';
import { getAllTopics } from '../api/articlesAPI';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';

export default function SavedTopicsSettings () {
    const savedTopics = useSelector(state => state.topics.topics);
    const updateLoading = useSelector(state => state.topics.updateTopicsLoading);
    const updateError = useSelector(state => state.topics.updateTopicsError);
    const [displayedSavedTopics, setDisplayedSavedTopics] = useState([]);
    const [displayedUnsavedTopics, setDisplayedUnsavedTopics] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setDisplayedSavedTopics(savedTopics);
        getAllTopics().then(topics => {
            setDisplayedUnsavedTopics(topics.filter(topic => !savedTopics.some(savedTopic => savedTopic.id === topic.id)));
        });
    }, []);


    const removeSavedTopic = (id) => {
        const removedTopics = displayedSavedTopics.find(savedTopic => savedTopic.id === id);
        setDisplayedSavedTopics(prev => prev.filter(savedTopic => savedTopic.id !== id));
        setDisplayedUnsavedTopics(prev => [...prev, removedTopics]);
    }

    const addSavedTopic = (id) => {
        const addedTopic = displayedUnsavedTopics.find(unsavedTopic => unsavedTopic.id === id);
        setDisplayedUnsavedTopics(prev => prev.filter(unsavedTopic => unsavedTopic.id !== id));
        setDisplayedSavedTopics(prev => [...prev, addedTopic]);
    }

    const confirmChanges = async () => {
        const topicIds = displayedSavedTopics.map(savedTopic => savedTopic.id);
        const res = await dispatch(updateUserSavedTopicsThunk(topicIds));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(fetchUserSavedTopics());
        }
    }

    const confirmButtonDisabled = updateLoading || updateError;
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
        <Card>
            <CardContent>
                <CardHeader title='Your Saved Topics' />
                <List>
                    {
                        savedTopics.length === 0 ? <ListItem>You have no saved topics.</ListItem> :
                        displayedSavedTopics.map((savedTopic, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemButton>
                                        <ListItemText primary={savedTopic.topic} />
                                        <IconButton onClick={() => {
                                            removeSavedTopic(savedTopic.id);
                                        }}>
                                            <Delete />
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <CardHeader title='Add a Topic' />
                <List>
                    {
                        displayedUnsavedTopics.map((unsavedTopic, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemButton>
                                        <ListItemText primary={unsavedTopic.topic} />
                                        <IconButton onClick={() => {
                                            addSavedTopic(unsavedTopic.id);
                                        }}>
                                            <Add />
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <CardActions>
                    <Button 
                        variant='contained' 
                        onClick={confirmChanges}
                        disabled={confirmButtonDisabled}
                    >
                        {confirmButtonLabel()}
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}