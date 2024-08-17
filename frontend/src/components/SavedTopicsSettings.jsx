import { updateUserSavedTopicsThunk, fetchUserSavedTopics } from '../state/slices/topicsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SavedTopicsSettings () {
    return (
        <Card>
            <CardContent>
                <Typography variant='h6'>
                    Your Saved Topics
                </Typography>
            </CardContent>
        </Card>
    )
}